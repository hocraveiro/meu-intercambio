<template>
  <div class="timeline-card">
    <div class="list">
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
  import {firebase} from '@/store'

  const TODAY = moment().format('Y-MM-DD')

  export default {
    props: ['item'],
    data () {
      return {
        name: '',
        newItem: {
          title: null,
          date: TODAY
        },
        timelineItems: []
      }
    },
    methods: {
      createNewItem () {
        const newItem = firebase.database().ref(`${this.item}`).push()
        newItem.set(this.newItem)
        this.newItem = {title: null, date: TODAY}
      }
    },
    mounted () {
      firebase
        .database()
        .ref(this.item)
        .on('value', (snapshot) => {
          const items = snapshot.val() || []
          const itemsArray = Object.keys(items || {}).map(key => {
            return {id: key, ...items[key]}
          })
          itemsArray.sort((item1, item2) => {
            if (item1.date > item2.date) {
              return -1
            } else if (item1.date < item2.date) {
              return 1
            } else {
              return 1
            }
          })
          this.timelineItems = itemsArray
          this.name = name
          this.$emit('loaded')
        })
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .timeline-card{
    height: 100%;
    padding-bottom: 40px;

    > .loading{
      margin: 30px 0;
      .mispinner{
        width: 30px;
      }
    }

    > .list {
      height: 100%;
      overflow-y: scroll;
      padding-left: 10px;
      width: 100%;
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
