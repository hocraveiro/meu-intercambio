<template>
  <div class="countdown-card">
    <p class="title" v-if="!shipmentDate">
      Tempo para o embarque
    </p>
    <div v-if="!shipmentDate">
      <input type="date" v-model="shipmentDate" class="date">
      <span class="comp">Informe a data de embarque</span>
    </div>


    <p class="days" v-if="timeLeft">{{parseInt(timeLeft.as('days'))}} <span class="comp">dias</span></p>
    <div class="time" v-if="timeLeft">
      <div class="block">{{timeLeft.hours()}}  <span class="comp">horas</span> </div>
      <div class="block">{{timeLeft.minutes()}}  <span class="comp">minutos</span> </div>
      <div class="block">{{timeLeft.seconds()}}  <span class="comp">segundos</span></div>
    </div>
    <p v-if="shipmentDate" class="textfooter">
      restantes para o embarque no dia
      <span class="shipmentdate">{{shipmentDate | date}}</span>.
      <span class="remove" @click="remove">(Alterar)</span>
    </p>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    // props: ['shipmentDate'],
    data () {
      return {
        currentInterval: null,
        countdown: null,
        timeLeft: null
      }
    },
    methods: {
      initCountDown () {
        const today = Date.now()
        const shipmentDate = new Date(this.shipmentDate).getTime()
        const diff = shipmentDate - today
        this.timeLeft = moment.duration(diff)

        this.currentInterval = setInterval(() => {
          this.timeLeft = moment.duration(this.timeLeft.asSeconds() - 1, 'seconds')
        }, 1000)
      },
      remove () {
        clearInterval(this.currentInterval)
        this.$store.dispatch('setShipmentDate', null)
        this.shipmentDate = null
        this.timeLeft = null
      }
    },
    computed: {
      shipmentDate: {
        get () {
          return this.$store.state.user.shipmentDate
        },
        set (value) {
          this.$store.dispatch('setShipmentDate', value)
          if (value) {
            this.initCountDown()
          }
        }
      }
    },
    beforeDestroy () {
      this.remove()
    },
    mounted () {
      if (this.shipmentDate) {
        this.initCountDown()
      }
    }

  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .countdown-card{
    background: $color-w-op8;
    box-shadow: 0px 0px 10px $color-b-op7;
    padding: 20px;
    width: 100%;

    > .title{
      color: $color-b-op7;
      font-weight: 600;
    }

    .date{
      border: 1px solid $color-1;
      background: none;
      color: $color-1;
      padding: 10px;
      margin-top: 30px;
      width: calc(100% - 20px);
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
