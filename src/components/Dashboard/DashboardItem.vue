<template>
  <div class="dashboard-item">
    <svg version="1.1" class="remove" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 507.867 507.867" style="enable-background:new 0 0 507.867 507.867;" xml:space="preserve" @click="$emit('remove', item)">
      <g transform="matrix(0.7071 -0.7071 0.7071 0.7071 -13.255 32)">
        <rect x="-15.994" y="34.743" width="95.992" height="622.24"/>
        <rect x="-279.122" y="297.871" width="622.24" height="95.992"/>
      </g>
    </svg>
    <input v-model="name" class="title" @change="(evt) => $emit('updateName', item, evt.target.value)">
    <component :is="types[item.component]" v-bind="{item: item.ref}" @loaded="onLoaded"></component>
    <div class="loading container justify-content-center" v-if="!loaded">
      <mi-spinner/>
    </div>
  </div>
</template>
<script>
  import Card from '@/components/Card'
  import CountDown from '@/components/CountDown'
  import MiSpinner from '@/components/Spinner'
  import TimeLine from '@/components/TimeLine'
  import Todo from '@/components/Todo/Todo'

  import {GridItem} from 'vue-grid-layout'

  export default {
    components: {GridItem, MiSpinner},
    data () {
      return {
        name: this.item.name,
        loaded: this.item.loaded,
        types: {
          'Cards': Card,
          'CountDown': CountDown,
          'Timeline': TimeLine,
          'Todo': Todo
        }
      }
    },
    methods: {
      onLoaded () {
        this.loaded = true
      }
    },
    props: ['item']
  }
</script>
<style lang="scss" scoped>
  @import '../../scss/variables';

  .dashboard-item{
    background: $color-w-op9;
    box-shadow: 0px 0px 10px $color-b-op7;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    position: relative;
    width: 100%;

    > .loading {
      align-items: center;
      display: flex;
      height: calc(100% - 35px);
      left: 0px;
      position: absolute;
      top: 20px;
      width: 100%;

      .mispinner{
        width: 30px;
      }
    }

    > .remove{
      display: block;
      position: absolute;
      padding: 20px;
      right: -10px;
      top: -10px;
      z-index: 2;
      width: 50px;
    }

    > .title{
      background: none;
      border: none;
      color: $color-b-op7;
      font-size: 16px;
      font-weight: 600;
      padding: 5px;
      width: 100%;
    }

  }
</style>

