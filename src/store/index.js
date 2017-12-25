import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import moment from 'moment'
import config from '../config'
import localStoragePlugin from './localStoragePlugin'

Vue.use(Vuex)

firebase.initializeApp(config)

const user = localStorage.getItem('user')
const defaultUser = (user) ? JSON.parse(user) : {name: null, token: null, isAuth: false}

const store = new Vuex.Store({
  plugins: [localStoragePlugin],
  state: {
    background: 'background.jpg',
    user: defaultUser,
    photos: [],
    timeline: {
      fetching: true,
      items: []
    },
    todos: {
      fetching: true,
      items: []
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.items.push(todo)
    },
    setUser (state, user) {
      // if (user.destiny) {
      //   const randIndex = Math.floor(Math.random() * (29 - 0 + 1)) + 0
      //   state.background = `${user.destiny.id}/${randIndex}.jpeg`
      // }
      state.user = user
    },
    setPhotos (state, photos) {
      state.photos = photos
    },
    setTimeline (state, timeline) {
      state.timeline = {
        fetching: false,
        items: timeline
      }
    },
    setTodos (state, todos) {
      state.todos = {
        fetching: false,
        items: todos
      }
    }
  },
  actions: {
    addTimelineItem ({commit, dispatch, state}, item) {
      const timelineItem = firebase.database().ref(`timeline/${state.user.uid}`).push()
      console.log(item)
      timelineItem.set(item)
    },
    async auth ({ commit, dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider()
      try {
        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result)
        const user = {
          ...result.user.providerData[0],
          uid: result.user.uid,
          token: result.credential.accessToken
        }
        const snapshot = await firebase.database().ref(`users/${user.uid}`).once('value')
        const userDb = snapshot.val() || user
        if (!userDb.createdAt) {
          userDb.createdAt = moment().format('Y-M-D')
        }
        dispatch('updateUser', userDb)
        return userDb
      } catch (error) {
        throw new Error(error)
      }
    },
    async getUserPhotos ({ commit }, destinyId) {
      const snapshot = await firebase.database().ref(`photos/${destinyId}`).once('value')
      const photos = snapshot.val() || []
      commit('setPhotos', photos)
    },
    async getTimeline ({commit, state}) {
      firebase.database().ref(`timeline/${state.user.uid}`).on('value', (snapshot) => {
        const timeline = snapshot.val() || {}
        const timelineArray = Object.keys(timeline).map(key => {
          return {id: key, ...timeline[key]}
        })
        commit('setTimeline', timelineArray)
      })
    },
    async getTodos ({ commit, state }) {
      firebase.database().ref(`todos/${state.user.uid}`).on('value', (snapshot) => {
        const todos = snapshot.val() || {}
        const todosArray = Object.keys(todos).map(key => {
          return {id: key, ...todos[key]}
        })
        commit('setTodos', todosArray)
      })
    },
    addTodo ({commit, state}, todo) {
      const newTodo = firebase.database().ref(`todos/${state.user.uid}`).push()
      newTodo.set(todo)
    },
    logout ({commit}, todo) {
      commit('setUser', {})
    },
    removeTodo ({state}, todo) {
      firebase.database().ref(`todos/${state.user.uid}/${todo.id}`).remove()
    },
    setShipmentDate ({commit, state}, date) {
      const user = {...state.user}
      user.shipmentDate = date
      firebase.database().ref(`users/${state.user.uid}`).set(user)
      commit('setUser', user)
    },
    setUser ({commit}, user) {
      if (user.token) {
        user.isAuth = true
      } else {
        user.isAuth = false
      }
      commit('setUser', user)
    },
    updateTodo ({commit, state}, todo) {
      firebase.database().ref(`todos/${state.user.uid}/${todo.id}`).set(todo)
    },
    updateUser ({commit, dispatch}, user) {
      firebase.database().ref(`users/${user.uid}`).set(user)
      dispatch('setUser', user)
    }
  },
  getters: {
    timelineByDate (state) {
      return state.timeline.items.sort((item1, item2) => {
        if (item1.date > item2.date) {
          return -1
        } else if (item1.date < item2.date) {
          return 1
        } else {
          return 1
        }
      })
    }
  }
})

export default store
