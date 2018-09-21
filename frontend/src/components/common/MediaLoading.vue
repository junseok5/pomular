<template>
  <div class="loading-common MediaLoading" v-show="showMediaLoading"></div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['showMediaLoading'])
    }
  }
</script>

<style scoped>
  @import '../../styles/common/MediaLoading.css';
</style>
