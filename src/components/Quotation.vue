<template>
  <div class="quotation">
    {{quotation}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        quotation: null
      }
    },
    async mounted () {
      const options = {
        headers: new Headers({
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }),
        mode: 'cors'
      }
      fetch('https://www.melhorcambio.com/dolar_hoje/cotacao_cidade.php?idmoeda=11&idcidade=2&comercial=3%2C97', options)
        .then(response => {
          console.log(response)
          return response.text()
        })
        .then(quotation => {
          console.log('Quotation: ', quotation)
          this.quotation = quotation
        })
    }
  }
</script>
