<template>
  <div class="todo-card">
    <div class="list">
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
        const newTodo = firebase.database().ref(`${this.item}`).push()
        newTodo.set(todo)
      },
      removeTodo (todo) {
        firebase.database().ref(`${this.item}/${todo.id}`).remove()
      },
      updateTodo (todo) {
        firebase.database().ref(`${this.item}/${todo.id}`).set(todo)
      }
    },
    mounted () {
      const ref = firebase.database().ref(this.item)
      ref.on('value', (snapshot) => {
        const items = snapshot.val() || {}
        const todosArray = Object.keys(items || {}).map(key => {
          return {id: key, ...items[key]}
        })
        this.todos = todosArray
        this.todos.push({
          desc: null,
          status: true,
          date: moment().format('Y-M-D h:m:s')
        })
        this.$emit('loaded')
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
    width: 100%;

    > .list{
      bottom: 0px;
      height: 100%;
      left: 5px;
      list-style: none;
      margin: 0px;
      overflow-y: scroll;
      padding-bottom: 40px;
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }

</style>


