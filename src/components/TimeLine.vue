<template>
  <div class="timeline-card">
    <p class="title">Linha do tempo</p>
    <p v-if="fetching">Carregando...</p>
    <div class="list" v-if="!fetching">
      <p class="item -new">
        <input type="text" placeholder="+ Adicionar novo item" v-model="newItem.title">
        <input type="date" v-model="newItem.date">
        <button class="newitem" v-if="newItem.title" @click="createNewItem">+</button>
      </p>
      <p class="item" v-for="item in timelineItems" :key="item.id">
        <span class="title">{{item.title}}</span>
        <span class="date">{{item.date | date}}</span>
      </p>
      <p class="item -start">
        <span class="title">Inicio do projeto intercambio</span>
        <span class="date">{{$store.state.user.createdAt | date}}</span>
      </p>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        newItem: {
          title: null,
          date: moment().format('Y-M-D')
        },
        items: [
          {
            id: 1,
            title: 'Comprei curso de ingles',
            date: '2017-01-01'
          },
          {
            id: 2,
            title: 'Comprei pessagem para irlanda',
            date: '2017-01-02'
          },
          {
            id: 3,
            title: 'Comprei os 3000 euros',
            date: '2017-02-01'
          }
        ]
      }
    },
    methods: {
      createNewItem () {
        this.$store.dispatch('addTimelineItem', {...this.newItem})
        // this.items.push({...this.newItem})
        this.newItem = {title: null, date: moment().format('Y-M-D')}
      }
    },
    computed: {
      timelineItems () {
        return this.$store.getters.timelineByDate
      },
      fetching () {
        return this.$store.state.timeline.fetching
      }
    },
    mounted () {
      this.$store.dispatch('getTimeline')
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .timeline-card{
    background: $color-w-op8;
    box-shadow: 0px 0px 10px $color-b-op7;
    padding: 20px;

    > .title{
      color: $color-b-op7;
      font-weight: 600;
    }


    .item{
      padding: 10px 0px 10px 20px;
      position: relative;

      > .title{
        display: block;
        font-size: 14px;
        font-weight: 600;
      }
      > .date{
        color: $color-b-op3;
        font-size: 12px;
      }

      &:after, &:before{
        content: '';
        display: block;
        position: absolute;
      }

      &:after{
        background-color: $color-2;
        border: 3px solid $color-1;
        box-shadow: 0px 0px 10px $color-b-op3;
        border-radius: 25px;
        height: 13px;
        margin-top: -17px;
        left: -5px;
        top: 50%;
        width: 13px;
      }

      &:before{
        background-color: $color-1;
        height: 100%;
        left: 0px;
        top: 0px;
        width: 3px;
      }
      &.-start{
        &:before{
          height: 25%;
        }
      }
      &.-new{
        &:before{
          height: 75%;
          top: 25%;
        }
        color: $color-1;
        input{
          border: none;
          background: none;
          outline: none;
          font-size: 14px;
          font-weight: bold;
        }
        input[type='date']{
          font-size: 12px;
          color: $color-b-op3;
        }
      }
    }

    .newitem{
      background: $color-1;
      border: 1px solid $color-1;
      border-radius: 25px;
      box-shadow: 0px 0px 10px $color-b-op3;
      color: $color-w-op8;
      font-weight: bold;
      font-size: 16px;
      padding: 6px 10px;
      position: absolute;
      right: 0px;
      top: 50%;
      margin-top: -15px;
    }
  }

</style>
