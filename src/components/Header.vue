<template>
  <header class="my-header">
    <div class="size container justify-content-between align-items-center">
      <my-menu inverse="true" />
      <router-link to="/"><logo location="header"/></router-link>
      <div class="header-user">
        <img class="photo" :src="user.photoURL" @click="openMenu">
        <div class="body" :class="{'-open': isOpen}">
          <p>{{user.displayName}}</p>
          <p>{{user.email}}</p>
          <button class="btn" @click="logout">Sair</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import MyMenu from '@/components/Menu'
  import Logo from '@/components/Logo'
  export default{
    components: {MyMenu, Logo},
    computed: {
      user () {
        return this.$store.state.user
      }
    },
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
      openMenu () {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .my-header{
    background-color: $color-1;
    box-shadow: 2px 2px 5px $color-b-op7;
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
</style>

