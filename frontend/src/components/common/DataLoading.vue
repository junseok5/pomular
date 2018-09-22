<template>
  <div class="loading-common DataLoading" v-show="showDataLoading"></div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['showDataLoading'])
    }
  }
</script>

<style scoped>
@import '../../styles/common/DataLoading.css';
</style>
