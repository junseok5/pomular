<template>
  <transition name="fade">
    <div class="PlayControl" key="1" v-show="viewMediaContr" @click="playControl">
      <font-awesome-icon icon="play" v-show="!play" />
      <font-awesome-icon icon="pause" v-show="play" />
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'play',
        'viewMediaContr'
      ])
    },
    methods: {
      playControl () {
        this.$emit('playControl')
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MediaController/PlayController.css'
</style>
