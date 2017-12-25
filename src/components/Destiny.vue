<template>
  <div class="size container justify-content-center align-items-center align-self-center">
    <div class="card-destiny flex-basis-600">
      <h1 class="title">Qual é o seu destino?</h1>
      <ul class="destiny-list">
        <li class="item" v-for="destiny in destinies" @click="select(destiny)" :key="destiny.id">
          <span class="text">{{destiny.name}}</span>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        destinies: [
          {
            id: 'ireland',
            name: 'Irlanda'
          },
          {
            id: 'australia',
            name: 'Austrália'
          },
          {
            id: 99,
            name: 'Não sei ainda'
          }
        ]
      }
    },
    methods: {
      select (destiny) {
        if (destiny.id !== 99) {
          this.$store.dispatch('updateUser', {
            ...this.$store.state.user,
            destiny
          })
          this.$router.push('/')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .size{
    height: 100%;
  }

  .card-destiny{
    background-color: $color-w-op8;
    box-shadow: 0px 0px 10px $color-b-op7;
    border-radius: 5px;
    max-height: 600px;
    overflow: hidden;

    > .title{
      color: $color-b-op7;
      font-size: 36px;
      font-weight: normal;
      padding: 20px;
    }
  }

  .destiny-list{
    overflow: scroll;
    > .item{
      background-repeat: no-repeat;
      background-size: cover;
      display: block;
      height: 200px;

      > .text{
        text-shadow: 0px 0px 10px $color-b-op7;
        display: block;
        color: $color-w-op8;
        font-size: 36px;
        padding: 20px;
      }

      &:nth-child(1){
        background-image: url('./../assets/ireland.jpg');
      }
      &:nth-child(2){
        background-image: url('./../assets/australia.jpg');
      }
      &:nth-child(3){
        background-image: url('./../assets/other.jpg');
      }
    }
  }

  @media (max-width: 400px) {
    .card-destiny{
      > .title{
        font-size: 24px;
      }
    }
    .destiny-list{
      > .item{
        height: 150px;
        > .text{
          font-size: 24px;
        }
      }
    }
  }
</style>

