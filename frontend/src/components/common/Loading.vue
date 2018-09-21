<template>
  <div class="loading-common loading" v-show="showLoading"></div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['showLoading'])
    }
  }
</script>

<style scoped>
  @import '../../styles/common/Loading.css';
</style>
