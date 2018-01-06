<template>
  <div class="countdown-card">
    <div v-if="!shipmentDate" class="container column">
      <input type="date" v-model="shipmentDate" class="date">
      <span class="comp">Informe uma data</span>
    </div>
    <p class="days" v-if="timeLeft">{{parseInt(timeLeft.as('days'))}} <span class="comp">dias</span></p>
    <div class="time" v-if="timeLeft">
      <div class="block">{{timeLeft.hours()}}  <span class="comp">horas</span> </div>
      <div class="block">{{timeLeft.minutes()}}  <span class="comp">minutos</span> </div>
      <div class="block">{{timeLeft.seconds()}}  <span class="comp">segundos</span></div>
    </div>
    <p v-if="shipmentDate" class="textfooter">
      restantes para o dia
      <span class="shipmentdate">{{shipmentDate | date}}</span>.
      <span class="remove" @click="remove">(Alterar)</span>
    </p>
  </div>
</template>
<script>
  import moment from 'moment'
  import {firebase} from '@/store'

  export default {
    props: ['item'],
    data () {
      return {
        currentInterval: null,
        countdown: null,
        name: null,
        shipmentDate: null,
        timeLeft: null
      }
    },
    methods: {
      initCountDown () {
        const today = moment()
        const shipmentDate = new Date(this.shipmentDate).getTime()
        const diff = shipmentDate - today
        this.timeLeft = moment.duration(diff)

        this.currentInterval = setInterval(() => {
          this.timeLeft = moment.duration(this.timeLeft.asSeconds() - 1, 'seconds')
        }, 1000)
      },
      remove () {
        clearInterval(this.currentInterval)
        firebase.database().ref(this.item).child('shipmentDate').remove()
        this.timeLeft = null
      }
    },
    beforeDestroy () {
      this.remove()
    },
    mounted () {
      firebase
        .database()
        .ref(this.item)
        .on('value', (snapshot) => {
          const {shipmentDate} = snapshot.val() || {}
          this.shipmentDate = shipmentDate
          this.$emit('loaded')

          if (this.shipmentDate) {
            this.initCountDown()
          }
        })
    },
    watch: {
      shipmentDate (value) {
        if (value) {
          firebase.database().ref(this.item).child('shipmentDate').set(value)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .countdown-card{
    width: 100%;

    > .container{
      > .date{
        border: 1px solid $color-1;
        background: none;
        color: $color-1;
        margin-top: 20px;
        padding: 10px;
        width: 100%;
      }
    }


    > .days{
      font-size: 62px;
      text-align: center;
      margin-bottom: 20px;
    }

    .comp{
      color: $color-b-op5;
      font-size: 16px;
      display: block;
      width: 100%;
    }
    > .time{
      display: flex;
      text-align: center;
      justify-content: space-around;
      font-size: 24px;
      .comp{
        font-size: 12px;
      }
    }
    > .textfooter{
      margin-top: 20px;
      text-align: center;
      > .shipmentdate{
        font-weight: bold;
      }
      > .remove{
        color: $color-1;
        cursor: pointer;
        font-size: 14px;
        font-weight: normal;
        margin-top: 30px;
        text-decoration: underline;
        width: 100%;
      }
    }
  }


</style>
