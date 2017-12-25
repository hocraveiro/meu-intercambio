<template>
  <div class="bg-full container align-items-center">
    <div class="size container justify-content-center align-items-center">
      <form action="" class="login-form">
        <logo class="logo"></logo>
        <div class="sigin-google" @click="init">
          <img class="image" src="../assets/google.svg">
          <span class="text">Começar com google {{this.$store.state.user.name}}</span>
        </div>
        <p v-if="error">{{error}}</p>
      </form>
    </div>
  </div>
</template>
<script>
  import Logo from '@/components/Logo'

  export default {
    components: {Logo},
    data () {
      return {
        error: null
      }
    },
    methods: {
      init () {
        this.error = null
        this
          .$store
          .dispatch('auth')
          .then((success) => {
            if (!success.destiny) {
              this.$router.push('/destiny')
            } else {
              this.$router.push('/')
            }
          })
          .catch((error) => {
            console.log('Error', error)
            this.error = `Falha: ${error.message}`
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';


  .login-form{
    background-color: $color-w-op8;
    box-shadow: 0px 0px 10px $color-b-op3;
    border-radius: 5px;
    padding: 50px 20px 20px;
    .sigin-google{
      margin-top: 30px;
    }
  }
  .sigin-google{
    align-items: center;
    background-color: $color-2;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    padding: 14px 10px 10px;

    > .image{
      width: 35px;
    }

    > .text{
      color: $color-b-op7;
      margin-left: 15px;
      font-size: 18px;
      line-height: 100%;
    }
  }

</style>

