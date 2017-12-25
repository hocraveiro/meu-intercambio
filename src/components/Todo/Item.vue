<template>
  <div class="todo-item container align-items-center justify-content-between" :class="{'-done': !todo.status}" >

    <input type="text" class="title" v-model="todo.desc" v-if="!todo.id" v-on:blur="addTodo(todo)">
    <div class="container row" @click="changeStatus(todo)" v-if="todo.id">
      <p v-if="todo.id" class="title">{{todo.desc}}</p>
      <span class="date" v-if="todo.id">{{todo.date | datetime}}</span>
    </div>

    <div @click="remove(todo)" v-if="todo.id">
      <svg version="1.1" class="trash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 507.867 507.867" style="enable-background:new 0 0 507.867 507.867;" xml:space="preserve" >
        <g transform="matrix(0.7071 -0.7071 0.7071 0.7071 -13.255 32)">
          <rect x="-15.994" y="34.743" width="95.992" height="622.24"/>
          <rect x="-279.122" y="297.871" width="622.24" height="95.992"/>
        </g>
      </svg>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['todo'],
    methods: {
      addTodo (todo) {
        this.$store.dispatch('addTodo', todo)
      },
      changeStatus (todo) {
        todo.status = !todo.status
        this.$store.dispatch('updateTodo', {...todo})
      },
      remove (todo) {
        this.$store.dispatch('removeTodo', todo)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../scss/variables';

  .todo-item{
    cursor: pointer;
    position: relative;

    .title{
      background: none;
      border: none;
      color: $color-b-op7;
      font-size: 15px;
      font-weight: 600;
      margin: 0px;
      padding: 8px 5px 0px 20px;
      position: relative;
      outline: none;
      width: 100%;
    }

    &:before{
      border: 2px solid $color-1;
      border-radius: 25px;
      content: "";
      display: block;
      height: 8px;
      left: 0px;
      margin-top: -4px;
      position: absolute;
      top: 50%;
      width: 8px;
    }

    .date{
      color: #666;
      font-size: 10px;
      padding-left: 20px;
    }

    .trash{
      fill: $color-b-op7;
      display: block;
      height: 10px;
      margin-left: 10px;
      max-height: 10px;
      max-width: 10px;
      width: 10px;
    }

    &.-done{
      .title{
        text-decoration: line-through;
        text-decoration-color: $color-b-op7;
      }
      &:before{
        background-color: $color-b-op3;
      }
    }
  }
</style>



