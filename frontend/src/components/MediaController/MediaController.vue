<template>
  <div class="MediaController" ref="mediacontroller" @mousemove="onMouseMove">
    <StateController
      v-on:setMediaCurrentTime="setMediaCurrentTime"
    />
    <FullScreenController
      v-on:fullScreenHandler="fullScreenHandler"
    />
  </div>
</template>

<script>
  import FullScreenController from './FullScreenController'
  import StateController from './StateController'
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'MediaController',
    components: {
      'FullScreenController': FullScreenController,
      'StateController': StateController
    },
    computed: {
      ...mapState(['viewMediaContr'])
    },
    watch: {
      viewMediaContr () {
        const mediacontroller = this.$refs['mediacontroller'].style
        if (this.viewMediaContr) {
          mediacontroller.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        } else {
          mediacontroller.backgroundColor = 'rgba(0, 0, 0, 0)'
        }
      }
    },
    methods: {
      ...mapMutations(['onMouseMove']),
      fullScreenHandler () {
        this.$emit('fullScreenHandler')
      },
      setMediaCurrentTime (val) {
        this.$emit('setMediaCurrentTime', val)
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MediaController/MediaController.css'
</style>
