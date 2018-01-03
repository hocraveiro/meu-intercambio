<template>
  <div class="mi-card">
    <textarea v-model="desc.item" @change="update">

    </textarea>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        item: JSON.stringify(this.item)
      }
    },
    props: ['item'],
    wacth: {
      update (evt) {
        this.$emit('change', evt.target.value)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../scss/variables';

  .mi-card{
    height: 100%;
    width: 100%;
    // background-color: $color-w-op8;
    // box-shadow: 0px 0px 10px $color-b-op7;
  }
</style>

