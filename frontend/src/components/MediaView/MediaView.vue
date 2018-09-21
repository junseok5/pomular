<template>
  <div class="MediaView">
    <YoutubeMedia v-if="videoMode.youtube" @setTimer="setTimer" />
    <UserMedia v-if="videoMode.my" />
    <div class="video-mode">
      <div class="select-video-mode" ref="youtube" @click="videoModeHandler('youtube')">
        유튜브 비디오
      </div>
      <div class="select-video-mode" ref="my" @click="videoModeHandler('my')">
        내 비디오
      </div>
    </div>
    <MediaInput v-if="videoMode.my" />
    <table class="key-table" v-if="deviceType === 'PC'">
      <tr>
        <td>A</td>
        <td>S</td>
        <td>D</td>
        <td>Z</td>
        <td>J</td>
        <td>K</td>
        <td>L</td>
      </tr>
      <tr class="key-dsc">
        <td>이전 구간</td>
        <td>재생/정지</td>
        <td>다음 구간</td>
        <td>반복</td>
        <td>구간 반복</td>
        <td>자막 켜기/끄기</td>
        <td>자막 언어 변환</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import YoutubeMedia from './YoutubeMedia'
  import UserMedia from './UserMedia'
  import MediaInput from '../MediaInput/MediaInput'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      'YoutubeMedia': YoutubeMedia,
      'UserMedia': UserMedia,
      'MediaInput': MediaInput
    },
    computed: {
      ...mapState([
        'videoMode',
        'deviceType'
      ])
    },
    created () {
      this.getLocalStorageVideoMode()
    },
    mounted () {
      this.convertColor()
    },
    updated () {
      this.convertColor()
    },
    methods: {
      ...mapMutations([
        'setVideoMode',
        'setTimer',
        'clearTimer',
        'setLocalStorageVideoMode',
        'getLocalStorageVideoMode'
      ]),
      videoModeHandler (mode) {
        if (mode === 'my') {
          this.clearTimer()
        }
        this.setVideoMode(mode)
        this.setLocalStorageVideoMode()
      },
      convertColor () {
        if (this.videoMode.youtube) {
          const youtube = this.$refs['youtube']
          youtube.style.backgroundColor = '#747474'
        } else {
          const youtube = this.$refs['youtube']
          youtube.style.backgroundColor = '#4C4C4C'
        }
        if (this.videoMode.my) {
          const my = this.$refs['my']
          my.style.backgroundColor = '#747474'
        } else {
          const my = this.$refs['my']
          my.style.backgroundColor = '#4C4C4C'
        }
      }
    }
  }
</script>

<style>
  @import '../../styles/MediaView/MediaView.css'
</style>
