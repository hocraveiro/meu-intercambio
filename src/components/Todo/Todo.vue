<template>
  <div class="todo-card">
    <input v-model="name" class="title" @change="updateName">
    <div class="loading container justify-content-center" v-if="fetching">
      <mi-spinner/>
    </div>
    <div class="list" v-if="!fetching">
      <item v-for="(todo, index) in todos" :todo="todo" :key="index" @new="addTodo" @update="updateTodo" @remove="removeTodo"/>
    </div>
  </div>
</template>
<script>
  import Item from '@/components/Todo/Item'
  import MiSpinner from '@/components/Spinner'
  import {firebase} from '@/store'
  import moment from 'moment'

  export default{
    components: {Item, MiSpinner},
    props: ['item'],
    data () {
      return {
        fetching: true,
        name: '',
        todo: {
          desc: null,
          status: true
        },
        todos: []
      }
    },
    methods: {
      addTodo (todo) {
        const newTodo = firebase.database().ref(`${this.item}/items`).push()
        newTodo.set(todo)
      },
      removeTodo (todo) {
        firebase.database().ref(`${this.item}/items/${todo.id}`).remove()
      },
      updateName () {
        firebase.database().ref(this.item).child('name').set(this.name)
      },
      updateTodo (todo) {
        firebase.database().ref(`${this.item}/items/${todo.id}`).set(todo)
      }
    },
    mounted () {
      const ref = firebase.database().ref(this.item)
      ref.on('value', (snapshot) => {
        const {items, name} = snapshot.val() || {}
        const todosArray = Object.keys(items || {}).map(key => {
          return {id: key, ...items[key]}
        })
        this.todos = todosArray
        this.todos.push({
          desc: null,
          status: true,
          date: moment().format('Y-M-D h:m:s')
        })
        this.name = name
        this.fetching = false
      })
    },
    watch: {
      todos () {
        setTimeout(() => {
          const list = this.$el.querySelector('.todo-card .list')
          list.scrollTop = list.scrollHeight
        }, 0)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../scss/variables';

  .todo-card{
    height: 100%;
    position: relative;

    > .loading {
      margin: 30px 0;
      .mispinner{
        width: 30px;
      }
    }

    > .title{
      background: none;
      border: none;
      color: $color-b-op7;
      font-size: 16px;
      font-weight: 600;
      margin: 10px 0 0 20px;
      padding: 5px;
    }

    > .list{
      bottom: 0px;
      height: 100%;
      left: 25px;
      list-style: none;
      margin: 0px;
      overflow-y: scroll;
      padding: 0px 0px 100px 0px;
      position: absolute;
      right: 20px;
      top: 50px;
    }
  }

</style>


