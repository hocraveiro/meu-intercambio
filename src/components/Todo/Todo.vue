<template>
  <div class="todo-card">
    <p class="title">A fazer</p>
    <p v-if="todos.fetching">Carregando...</p>
    <p v-if="!todos.fetching && todos.items.length == 0">Você não tem nenhuma tarefa para realizar!</p>
    <div class="list" v-if="!todos.fetching">
      <item v-for="(todo, index) in todos.items" :todo="todo" :key="index" v-on:status="changeStatus" v-on:remove="remove"/>
    </div>
    <button @click="addTodo" class="btnnew">+ Nova tarefa</button>
    <!-- <div class="todo-footer">
      <input type="text" placeholder="ex. Comprar passagem aerea" v-model="todo.desc">
    </div> -->
  </div>
</template>
<script>
  import Item from '@/components/Todo/Item'
  export default{
    components: {Item},
    computed: {
      todos () {
        return this.$store.state.todos
      }
    },
    data () {
      return {
        todo: {
          desc: null,
          status: true
        }
      }
    },
    methods: {
      addTodo () {
        const todo = {status: true, desc: null, date: new Date().getTime()}
        this.$store.commit('addTodo', todo)
      },
      changeStatus (todo) {
        const index = this.todos.findIndex(todoItem => todoItem.desc === todo.desc)
        todo.status = !todo.status
        this.todos[index] = {...todo}
      },
      remove (todo) {
        console.log('Todo', todo)
      }
    },
    mounted () {
      this.$store.dispatch('getTodos')
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../scss/variables';

  .todo-card{
    box-shadow: 0px 0px 10px $color-b-op7;
    padding: 20px 20px 50px;
    background-color: $color-w-op8;
    max-height: 450px;
    position: relative;

    > .title{
      color: $color-b-op7;
      font-weight: 600;
    }

    > .list{
      margin: 0px;
      padding: 0px;
      overflow: scroll;
      position: relative;
      list-style: none;
      max-height: 300px;
    }

    > .btnnew{
      background-color: $color-1;
      border: none;
      border-radius: 20px;
      bottom: -20px;
      box-shadow: 0px 0px 10px $color-b-op3;
      color: $color-w-op9;
      font-weight: 600;
      font-size: 15px;
      position: absolute;
      padding: 15px 10px;
      left: 50%;
      margin-left: -65px;
      width: 130px;
    }
  }

</style>

