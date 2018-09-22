<template>
  <transition name="fade">
    <div class="StateController" v-show="viewMediaContr">
      <input class="state" type="range" min="0" max="10000" @input="seeking" v-model="currentValue"  />
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        currentValue: 0
      }
    },
    computed: {
      ...mapState([
        'duration',
        'currentTime',
        'viewMediaContr'
      ]),
      computedCurValue () {
        return this.currentValue * (this.duration / 10000)
      },
      computedCurrentTime () {
        return this.currentTime / this.duration * 10000
      }
    },
    watch: {
      currentTime () {
        this.setCurrentValue()
      },
      duration () {
        this.setCurrentValue()
      }
    },
    methods: {
      seeking () {
        this.$emit('setMediaCurrentTime', this.computedCurValue)
      },
      setCurrentValue () {
        this.currentValue = this.computedCurrentTime
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MediaController/StateController.css'
</style>
