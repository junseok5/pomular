<template>
  <div class="TimeViewController" v-show="viewMediaContr">
    <div class="current time-view">{{ convertCurrentTime }}</div>
    <div class="division time-view">/</div>
    <div class="duration time-view">{{ convertDuration }}</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'duration',
        'currentTime',
        'viewMediaContr'
      ]),
      convertCurrentTime () {
        return this.reverseUnitConverter(this.currentTime)
      },
      convertDuration () {
        return this.reverseUnitConverter(this.duration)
      }
    },
    methods: {
      addZero (time) {
        if (time < 10) {
          return '0' + time
        }
        return time
      },
      reverseUnitConverter (time) {
        if (time < 0) return
        time = Math.floor(time)
        let result = ''
        let second = this.addZero(time % 60)
        let minute = Math.floor(time / 60)
        let hour = Math.floor(minute / 60)

        if (minute > 60) {
          minute = minute % 60
        }

        if (hour === 0) {
          if (minute === 0) {
            result = '0:' + second
          } else {
            result = minute + ':' + second
          }
        } else {
          minute = this.addZero(minute)
          result = hour + ':' + minute + ':' + second
        }
        return result
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MediaController/TimeViewController.css'
</style>
