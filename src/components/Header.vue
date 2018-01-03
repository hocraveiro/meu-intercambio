<template>
  <header class="my-header">
    <div class="size container justify-content-between align-items-center">
      <my-menu inverse="true" />
      <router-link to="/"><logo location="header"/></router-link>
      <div class="container ">
        <div class="add-items" @click="isOpenAddItem = !isOpenAddItem">
          <svg  class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
            <g>
              <g id="add">
                <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z" fill="#FFFFFF"/>
              </g>
            </g>
          </svg>
          <div class="items" :class="{'-active': isOpenAddItem}" >
            <div class="item" @click="addToDashBoard('Todo')">
              <p class="title">Todo List</p>
              <p class="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit sapiente totam excepturi qui iure id officia, eveniet sed?</p>
            </div>
            <div class="item" @click="addToDashBoard('Timeline')">
              <p class="title">Timeline</p>
              <p class="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit sapiente totam excepturi qui iure id officia, eveniet sed?</p>
            </div>
            <div class="item" @click="addToDashBoard('CountDown')">
              <p class="title">Countdown</p>
              <p class="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit sapiente totam excepturi qui iure id officia, eveniet sed?</p>
            </div>
            <div class="item" @click="addToDashBoard('Cards')">
              <p class="title">Cards</p>
              <p class="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit sapiente totam excepturi qui iure id officia, eveniet sed?</p>
            </div>
          </div>
        </div>
        <div class="header-user" v-if="!isMobile">
          <img class="photo" :src="user.photoURL" @click="openMenu">
          <div class="body" :class="{'-open': isOpenUser}">
            <p>{{user.displayName}}</p>
            <p>{{user.email}}</p>
            <button class="btn" @click="logout">Sair</button>
          </div>
        </div>
      </div>

    </div>
  </header>
</template>
<script>
  import MyMenu from '@/components/Menu'
  import Logo from '@/components/Logo'
  import {firebase} from '@/store'

  export default{
    components: {MyMenu, Logo},
    computed: {
      isMobile () {
        return this.$store.state.isMobile
      },
      user () {
        return this.$store.state.user
      }
    },
    data () {
      return {
        isOpenUser: false,
        isOpenMenu: false,
        isOpenAddItem: false
      }
    },
    methods: {
      addToDashBoard (item) {
        firebase.database().ref(`users/${this.user.uid}/dashboard`).once('value').then((snapshot) => {
          const dashboard = snapshot.val() || {}
          const dashboardArray = Object.keys(dashboard).map(key => {
            return {id: key, ...dashboard[key]}
          })

          let x = 0
          if (dashboardArray.length > 0) {
            x = dashboardArray[dashboardArray.length - 1].x + 4
          }

          if (x === 12) {
            x = 0
          }

          const y = 0
          let ref, name
          switch (item) {
            case 'Todo':
              ref = firebase.database().ref(`todo/${this.user.uid}`)
              name = 'Minhas tarefas'
              break
            case 'Timeline':
              ref = firebase.database().ref(`timeline/${this.user.uid}`)
              name = 'Minha linha do tempo'
              break
            case 'CountDown':
              ref = firebase.database().ref(`countdown/${this.user.uid}`)
              name = ''
              break
            default:
              ref = null
              name = null
          }

          const newItem = ref.push()
          newItem.set({
            name,
            items: []
          })

          const dashItem = {x, y, 'w': 4, 'h': 8, 'i': dashboardArray.length + 1, component: item, ref: newItem.path.toString()}
          const newDash = firebase.database().ref(`users/${this.user.uid}/dashboard`).push()
          newDash.set(dashItem)
        })
      },
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
      openMenu () {
        this.isOpenUser = !this.isOpenUser
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .my-header{
    background-color: $color-1;
    box-shadow: 0px 0px 10px $color-b-op7;
    height: 40px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 10;
    .size{
      height: 40px;
    }
  }

  .header-user{
    display: flex;
    align-items: center;
    margin-left: 10px;
    position: relative;

    > .photo{
      border: 1px solid #FFF;
      border-radius: 25px;
      display: black;
      width: 30px;
    }

    > .body{
      background-color: #F4F4F4;
      box-shadow: 0px 0px 10px $color-b-op7;
      border-top: none;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
      display: none;
      min-height: 0px;
      overflow: hidden;
      padding: 30px 20px;
      position: absolute;
      top: 44px;
      right: 00px;
      opacity: 0;
      transition: all 0.2s ease-in;
      z-index: 10;

      &.-open{
        display: block;
        opacity: 1;
      }

      > .btn{
        padding: 10px;
        background: $color-1;
        border: 1px solid $color-1;
        border-radius: 5px;
        color: $color-w-op8;
        margin-top: 20px;
        font-weight: 600;
        width: 100%;
      }
    }
  }

  .add-items{
    align-items: center;
    background-color: $color-w-op3;
    border-radius: 5px;
    display: flex;
    padding: 8px;
    position: relative;

    > .icon{
      height: 14px;
      width: 14px;
    }

    .items{
      background: $color-w-op8;
      box-shadow: 0px 0px 10px $color-b-op7;
      margin-top: 10px;
      max-height: 0px;
      opacity: 0;
      overflow: hidden;
      padding: 10px;
      position: fixed;
      right: 5%;
      top: 30px;
      transition: all 0.3s ease-in-out;
      width: 300px;
      z-index: -1;

      > .item{
        cursor: pointer;

        > .title {
          font-size: 14px;
          font-weight: bold;
        }
        > .desc {
          color: $color-b-op7;
          font-size: 13px;
          margin-bottom: 10px;
        }
      }
      &.-active{
        height: 100%;
        max-height: 300px;
        opacity: 1;
      }
    }
  }

  @media (max-width: 960px){
    .add-items{
      .items{
        background-color: #FFF;
        height: 100%;
        max-height: 100%;
        position: fixed;
        right: 0px;
        transform: translateX(200%);
        &.-active{
          max-height: 100%;
          opacity: 1;
          transform: translateX(0%);
        }
      }
    }
  }
</style>

