<template>
  <div id="app" class="bg-full">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    deviceOrientationHandler (eventData) {
      let gamma = 50 + (eventData.gamma / 10)
      if (gamma < 1) {
        gamma = 1
      } else if (gamma > 99) {
        gamma = 99
      }
      const screen = document.querySelector('.screen')
      screen.style.backgroundPosition = `${gamma}% 50%`
    }
  },
  computed: {
    background () {
      return `url(./assets/${this.$store.state.background})`
    }
  },
  mounted () {
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', this.deviceOrientationHandler, false)
    }
  },
  beforeDestroy () {
    window.removeEventListener('deviceorientation', this.deviceOrientationHandler, false)
  }
}
</script>

<style lang="scss">
  @import './scss/reset';
  @import './scss/global';

  .bg-full{
    width: 100%;
    height: 100%;
    background-image: url(./assets/background.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

</style>
