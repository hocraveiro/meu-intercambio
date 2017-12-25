<template>
  <div class="screen home" :style="{backgroundImage: background}">
    <my-header></my-header>
    <div class="size container justify-content-center justify-content-sm-around wrap">
      <div class="order-2 order-sm-1 flex-basis-300">
        <todo></todo>
      </div>
      <div class="order-1 order-sm-2 flex-basis-300">
        <count-down></count-down>
      </div>
      <div class="order-2 order-sm-3 flex-basis-300">
        <time-line></time-line>
      </div>
    </div>
  </div>
</template>
<script>
  import CountDown from '@/components/CountDown'
  import MyHeader from '@/components/Header'
  import TimeLine from '@/components/TimeLine'
  import Todo from '@/components/Todo/Todo'
  // import Unsplash from 'unsplash-js'
  // const unsplash = new Unsplash({
  //   applicationId: '069fb72cbdc668081d55664de65740737e93428ddaf43149ab5e5eb22657e641',
  //   secret: '6f9a3504d54614939ec2b6dc5b80bbf2f4236029d46f4b95b213f07fa8e9304f',
  //   callbackUrl: 'https://meu-intercambio-9ac28.firebaseapp.com/images'
  // })
  export default{
    components: {CountDown, MyHeader, Todo, TimeLine},
    computed: {
      photos () {
        return this.$store.state.photos
      },
      user () {
        return this.$store.state.user
      }
    },
    data () {
      return {
        todos: [{
          status: true,
          desc: 'Tirar passaporte'
        },
        {
          status: true,
          desc: 'Comprar passagem'
        }]
      }
    }
  }
</script>
<style lang="scss" scoped>

  .home{
    margin: 0px;
    padding-top: 44px;
    min-height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    overflow: scroll;
    > .size{
      padding-top: 5%;
      > div {
        margin-bottom: 25px;
      }
    }
  }
</style>
