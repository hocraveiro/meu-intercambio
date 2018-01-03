<template>
  <div>
    <div class="menu-button" @click="toggleMenu" :class="{open: isOpen}">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="overlay" @click="toggleMenu" :class="{open: isOpen}">
      <div class="left-menu" :class="{open: isOpen}">
        <div class="header-user">
          <img class="photo" :src="user.photoURL">
          <div class="info">
            <p class="name">{{user.displayName}}</p>
            <p class="email">{{user.email}}</p>
          </div>
        </div>
        <div class="body">
          <div class="menu-list">
            <div class="item">
              - Home
            </div>
            <div class="item">
              - Despesas
            </div>
            <div class="item">
              - Lembretes
            </div>
            <div class="item">
              - Ajuda
            </div>
          </div>
          <button class="btn -second" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Logo from '@/components/Logo'
  export default {
    components: {Logo},
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
      toggleMenu () {
        this.isOpen = !this.isOpen
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .menu-button{
    width: 30px;
    height: 30px;
    position: relative;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    cursor: pointer;

    > span{
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: $color-w-op8;
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: .25s ease-in-out;
      &:nth-child(1) {
        top: 4px;
      }
      &:nth-child(2) {
        top: 14px;
      }
      &:nth-child(3) {
        top: 24px;
      }
    }
    &.open{
      > span{
        &:nth-child(1) {
          top: 15px;
          opacity: 0px;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          width: 0%;
          left: 50%;
        }
        &:nth-child(3) {
          top: 15px;
          transform: rotate(-45deg);
        }
      }
    }
  }

  .overlay{
    background: $color-b-op7;
    bottom: 0px;
    top: 0px;
    left: -100%;
    position: fixed;
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 10;
    &.open{
      left: 0;
    }
  }
  .left-menu{
    background-color: $color-1;
    bottom: 0px;
    left: -100%;
    height: 100%;
    position: fixed;
    top: 0px;
    transition: all 0.3s ease-in-out;
    width: 300px;
    z-index: 11;
    &.open{
      left: 0px;
    }
    > .header-user{
      display: flex;
      padding-left: 30px;
      padding-top: 30px;
      align-items: center;
      > .photo{
        border: 3px solid $color-w-op8;
        border-radius: 50%;
        display: block;
        margin-right: 10px;
        height: 50px;
        width: 50px;
      }
      .name{
        color: $color-w-op8;
        font-size: 18px;
        font-weight: bold;
      }
      .email{
        color: $color-w-op8;
        font-size: 14px;
      }
    }
    > .body{
      > .btn{
        position: absolute;
        bottom: 10px;
        left: 10%;
        width: 80%;
      }
    }
  }
  .menu-list{
    > .item{
      color: $color-w-op8;
      cursor: pointer;
      font-weight: normal;
      padding: 10px 30px;
      &:first-child{
        margin-top: 30px;
      }
      &:hover{
        font-weight: 600;
      }
    }
  }
</style>
