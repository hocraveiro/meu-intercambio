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
    dashboard: [],
    isMobile: (/Mobi/.test(navigator.userAgent)),
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
    setUser (state, user) {
      state.user = user
    },
    setPhotos (state, photos) {
      state.photos = photos
    }
  },
  actions: {
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
    logout ({commit}, todo) {
      commit('setUser', {})
    },
    setUser ({commit}, user) {
      if (user.token) {
        user.isAuth = true
      } else {
        user.isAuth = false
      }
      commit('setUser', user)
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

const DashboardTypes = {
  'Cards': 'Card',
  'CountDown': 'CountDown',
  'Timeline': 'TimeLine',
  'Todo': 'Todo'
}

export default store
export { firebase, DashboardTypes }
