<template>
  <div class="dashboard">
    <my-header></my-header>
    <div class="size">

      <grid-layout
        :layout="dashboard"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        v-if="!isMobile"
      >
        <grid-item
          v-for="item in dashboard"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.id"
          @moved="(x, y) => $emit('moved', x,y)"
          @resized="(h, w) => $emit('resized', h, w)"
        >
          <dashboard-item  :item="item" @remove="removeItem" @updateName="updateName"></dashboard-item>
        </grid-item>
      </grid-layout>

      <v-touch tag="div" class="mi-slider" v-if="isMobile" v-on:swipeleft="handleSwipeLeft" v-on:swiperight="handleSwipeRight">
        <transition
          v-for="(item, key) in dashboard"
          :name="sliderAnimation"
          :key="item.id"
        >
          <div class="slideritem" v-if="key == sliderActive">
            <dashboard-item  :item="item" @remove="removeItem" @updateName="updateName"></dashboard-item>
          </div>
        </transition>
        <div class="footer container align-items-center justify-content-center">
          <span class="ball" v-for="(item, key) in dashboard" :key="item.id" :class="{'-active': sliderActive == key}"></span>
        </div>
      </v-touch>
    </div>
  </div>
</template>
<script>
  import MyHeader from '@/components/Header'
  import {firebase} from '@/store'
  import {GridLayout, GridItem} from 'vue-grid-layout'
  import DashboardItem from '@/components/Dashboard/DashboardItem'

  export default{
    components: {DashboardItem, GridLayout, GridItem, MyHeader},
    computed: {
      isMobile () {
        return this.$store.state.isMobile
      },
      photos () {
        return this.$store.state.photos
      },
      user () {
        return this.$store.state.user
      }
    },
    data () {
      return {
        dashboard: [],
        sliderAnimation: 'slide-fade-right',
        sliderActive: 0
      }
    },
    methods: {
      itemMoved (i, newX, newY) {
        const item = this.dashboard.find(item => item.i === i)
        item.x = newX
        item.y = newY
        firebase.database().ref(`users/${this.user.uid}/dashboard/${item.id}`).set(item)
      },
      itemResized (i, newH, newW) {
        const item = this.dashboard.find(item => item.i === i)
        item.h = newH
        item.w = newW
        firebase.database().ref(`users/${this.user.uid}/dashboard/${item.id}`).set(item)
      },
      getLeftClass (index) {
        if (this.sliderActive === 0 && index === this.dashboard.length - 1) {
          return true
        } else if (this.sliderActive - 1 === index) {
          return true
        } else {
          return false
        }
      },
      getRightClass (index) {
        if (index === 0 && this.sliderActive === this.dashboard.length - 1) {
          return true
        } else if (this.sliderActive + 1 === index) {
          return true
        } else {
          return false
        }
      },
      handleSwipeLeft () {
        this.sliderAnimation = 'slide-fade-right'
        const next = this.sliderActive + 1
        if (next > this.dashboard.length - 1) {
          this.sliderActive = 0
        } else {
          this.sliderActive = next
        }
      },
      handleSwipeRight () {
        this.sliderAnimation = 'slide-fade-left'
        const previous = this.sliderActive - 1
        if (previous < 0) {
          this.sliderActive = this.dashboard.length - 1
        } else {
          this.sliderActive = previous
        }
      },
      removeItem (item) {
        if (confirm('Deseja remover o item?')) {
          firebase.database().ref(`users/${this.user.uid}/dashboard/${item.id}`).remove()
          firebase.database().ref(`${item.ref}`).remove()
        }
      },
      updateName (item, newName) {
        firebase.database().ref(`users/${this.user.uid}/dashboard/${item.id}`).child('name').set(newName)
        console.log(item, newName)
      },
      updateDashboard () {

      }
    },
    mounted () {
      firebase
        .database()
        .ref(`users/${this.user.uid}/dashboard`)
        .on('value', (snapshot) => {
          const dashboard = snapshot.val() || {}
          const dashboardArray = Object.keys(dashboard).map(key => {
            return {id: key, ...dashboard[key]}
          })
          this.dashboard = dashboardArray
        })
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../scss/variables';

  .dashboard{
    margin: 0px;
    padding-top: 44px;
    min-height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    overflow: scroll;
    > .size{
      height: 100%;
      overflow: visible;
    }
  }

  .mi-slider{
    height: 100%;
    position: relative;
    width: 100%;
    .slide-fade-left-enter-active, .slide-fade-right-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-left-leave-active, .slide-fade-right-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-left-leave-to{
      transform: translateX(100%);
      opacity: 0;
    }

    .slide-fade-left-enter{
      transform: translateX(-100%);
      opacity: 0;
    }

    .slide-fade-right-leave-to{
      transform: translateX(-100%);
      opacity: 0;
    }

    .slide-fade-right-enter{
      transform: translateX(100%);
      opacity: 0;
    }

    > .slideritem {
      background-color: $color-w-op8;
      bottom: 30px;
      box-shadow: 0px 0px 10px $color-b-op7;
      position: absolute;
      top: 0px;
      transition: all 0.5s ease-in-out;
      width: 100%;

      > .remove{
        display: block;
        position: absolute;
        padding: 20px;
        right: -10px;
        top: -10px;
        z-index: 2;
        width: 50px;
      }

      &.-active{
        // transform: translateX(0);
        // opacity: 1;
      }
    }
    > .footer{
      position: absolute;
      bottom: 10px;
      width: 100%;
      > .ball{
        background-color: $color-w-op8;
        box-shadow: 0px 0px 10px $color-b-op7;
        border-radius: 50%;
        display: inline-block;
        margin: 0px 10px;
        height: 10px;
        width: 10px;

        &.-active{
          background-color: $color-1;
        }
      }
    }
  }

  @media (max-width: 900px){
    .home{
      .size{
        height: 100%;
        overflow: visible;
      }
    }
  }
</style>
