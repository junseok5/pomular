<template>
  <transition name="fade">
    <div class="FullScreenController" key="1" v-show="viewMediaContr" @click="fullScreenHandler">
      <font-awesome-icon icon="expand" v-show="!isFullScreen" />
      <font-awesome-icon icon="compress" v-show="isFullScreen" />
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'isFullScreen',
        'viewMediaContr'
      ])
    },
    methods: {
      fullScreenHandler () {
        this.$emit('fullScreenHandler')
      }
    }
  }
</script>

<style>
  @import '../../../styles/MediaView/MediaController/FullScreenController.css'
</style>
