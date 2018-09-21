<template>
  <div class="UserMedia" ref="UserMedia">
    <MediaLoading />
    <video
      ref="videoDom"
      preload="auto"
      poster="../../assets/video_poster.png"
      @mousemove="controlMouseMove"
      @click="showMediaControl"
      v-bind:src="objectURL"
      @timeupdate="onTimeUpdateListener"
      @seeking="onSeekingListener"
      @play="onPlay" @pause="onPause"
      @loadstart="loadingControl(true)"
      @loadeddata="loadedData(false)"
      @error="onError"
    />
    <Subtitle />
    <MobileController
      v-show="deviceType === 'Mobile'"
      v-on:playControl="playControl"
      v-on:repeat="repeat"
      v-on:skipPrev="skipPrev"
      v-on:skipNext="skipNext"
      v-on:timeRepeat="timeRepeat"
      v-on:convertSubtitleContent="convertSubtitleContent"
    />
    <PlayController
      v-if="deviceType === 'PC'"
      v-on:playControl="playControl"
    />
    <MediaController
      v-on:fullScreenHandler="fullScreenHandler"
      v-on:setMediaCurrentTime="setMediaCurrentTime"
    />
    <TimeViewController />
    <Message />
  </div>
</template>

<script>
  import Subtitle from './Subtitle.vue'
  import MobileController from './MobileController/MobileController.vue'
  import PlayController from './MediaController/PlayController.vue'
  import MediaController from './MediaController/MediaController.vue'
  import TimeViewController from './MediaController/TimeViewController.vue'
  import Message from '../common/Message.vue'
  import MediaLoading from '../common/MediaLoading.vue'
  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    components: {
      'Subtitle': Subtitle,
      'MobileController': MobileController,
      'PlayController': PlayController,
      'MediaController': MediaController,
      'TimeViewController': TimeViewController,
      'Message': Message,
      'MediaLoading': MediaLoading
    },
    data () {
      return {
        loaded: false,
        playTimeout: undefined
      }
    },
    computed: {
      ...mapState([
        'objectURL',
        'deviceType',
        'isMedia',
        'showMedia',
        'language',
        'subtitle',
        'koSubtitle',
        'showSubtitle',
        'isSubtitle',
        'isKoSubtitle',
        'subcount',
        'isSectionRepeat',
        'viewMediaContr',
        'showMessage',
        'messageText',
        'play',
        'isFullScreen'
      ]),
      ...mapGetters([
        'subtitleMaxIndex',
        'koSubtitleMaxIndex'
      ])
    },
    watch: {
      isSubtitle () {
        if (this.isSubtitle && this.loaded) {
          const currentTime = this.$refs['videoDom'].currentTime
          let index = this.binarySearch(this.subtitle, currentTime)
          this.setSubcount(index)
          this.setLocalStorageSubcount()
        }
      },
      showSubtitle () {
        if (this.showSubtitle) {
          this.setShowMessage({
            showMessage: true,
            messageText: '자막 on',
            messageDelay: 800
          })
        } else {
          this.setShowMessage({
            showMessage: true,
            messageText: '자막 off',
            messageDelay: 800
          })
        }
      },
      isSectionRepeat () {
        if (this.isSectionRepeat) {
          this.setShowMessage({
            showMessage: true,
            messageText: '구간반복 on',
            messageDelay: 800
          })
        } else {
          this.setShowMessage({
            showMessage: true,
            messageText: '구간반복 off',
            messageDelay: 800
          })
        }
      },
      isFullScreen () {
        this.setVideoSize()
      },
      language () {
        if (this.language === 'en') {
          this.setShowMessage({
            showMessage: true,
            messageText: '영어자막',
            messageDelay: 800
          })
          this.subtitleStart(this.subcount)
        } else {
          if (this.isKoSubtitle) {
            this.setShowMessage({
              showMessage: true,
              messageText: '한글자막',
              messageDelay: 800
            })
            this.subtitleStart(this.subcount)
          } else {
            this.setShowMessage({
              showMessage: true,
              messageText: '한글자막을 찾을 수 없습니다.',
              messageDelay: 1500
            })
          }
        }
      }
    },
    created () {
      this.setCurrentTime(0)
      this.setDuration(0)
      this.setPlay(false)
      this.setSubtitle([])
      this.setKoSubtitle([])
      this.setIsSubtitle(false)
      this.setIsKoSubtitle(false)
      this.getLocalStorageSubcount()
      this.getLocalStorageSubtitle()
      this.getLocalStorageKoSubtitle()
    },
    methods: {
      ...mapMutations([
        'getLocalStorageSubtitle',
        'getLocalStorageKoSubtitle',
        'getLocalStorageSubcount',
        'setSubcount',
        'setShowMediaLoading',
        'setLocalStorageSubcount',
        'setViewMediaContr',
        'setCurrentTime',
        'setDuration',
        'setPlay',
        'setShowMessage',
        'onMouseMove',
        'showMediaControl',
        'subtitleStart',
        'subtitleEnd',
        'setSubtitle',
        'setKoSubtitle',
        'setIsSubtitle',
        'setIsKoSubtitle'

      ]),
      clearAllInterval () {
        for (let i = 0; i < 100; i++) {
          window.clearInterval(i)
        }
      },
      loadingControl (val) {
        if (!this.isMedia) return
        this.setShowMediaLoading(val)
        this.setViewMediaContr(!val)
      },
      loadedData () {
        this.player = this.$refs['videoDom']
        this.loadingControl(false)
        this.setMediaDuration()
        if (this.isMedia) {
          this.setViewMediaContr(true)
          if (this.isSubtitle) {
            this.applySaveSubcount()
          }
        }
        this.loaded = true
      },
      onError () {
        this.setShowMediaLoading(false)
        this.setShowMessage({
          showMessage: true,
          messageText: '영상을 찾을 수 없습니다.',
          messageDelay: 2000
        })
      },
      applySaveSubcount () {
        const start = this.subtitle[this.subcount].start
        this.setCurrentTime(start)
        this.player.currentTime = start
      },
      setMediaDuration () {
        this.setDuration(this.player.duration)
      },
      onTimeUpdateListener (event) {
        let currentTime = event.target.currentTime
        this.setCurrentTime(currentTime)
        if (this.language === 'en') {
          if (!this.isSubtitle) return
          if (currentTime > this.subtitle[this.subcount].end) {
            this.subtitleEnd(currentTime)
          }
          if (this.subcount === this.subtitleMaxIndex) return
          const next = this.subcount + 1
          if (this.subtitle[next] === undefined) return
          if (this.isSectionRepeat) {
            this.sectionRepeat(currentTime, event.target)
            return
          }
          if (currentTime >= this.subtitle[next].start) {
            this.setSubcount(next)
            this.setLocalStorageSubcount()
            this.subtitleStart(next)
          }
        } else {
          if (!this.isKoSubtitle) return
          if (currentTime > this.koSubtitle[this.subcount].end) {
            this.subtitleEnd(currentTime)
          }
          if (this.subcount === this.koSubtitleMaxIndex) return
          const next = this.subcount + 1
          if (this.koSubtitle[next] === undefined) return
          if (this.isSectionRepeat) {
            this.sectionRepeat(currentTime, event.target)
            return
          }
          if (currentTime >= this.koSubtitle[next].start) {
            this.setSubcount(next)
            this.setLocalStorageSubcount()
            this.subtitleStart(next)
          }
        }
      },
      onSeekingListener (event) {
        if (!this.isSubtitle) return
        const currentTime = event.target.currentTime
        this.setCurrentTime(currentTime)
        let index
        if (this.language === 'en') {
          index = this.binarySearch(this.subtitle, currentTime)
          this.setSubcount(index)
          this.setLocalStorageSubcount()
          if (currentTime >= this.subtitle[this.subcount].start && currentTime < this.subtitle[this.subcount].end) {
            this.subtitleStart(index)
          }
        } else {
          index = this.binarySearch(this.koSubtitle, currentTime)
          this.setSubcount(index)
          this.setLocalStorageSubcount()
          if (currentTime >= this.koSubtitle[this.subcount].start && currentTime < this.koSubtitle[this.subcount].end) {
            this.subtitleStart(index)
          }
        }
      },
      convertSubtitleContent () {
        let currentTime = this.player.currentTime
        let index
        if (this.language === 'ko') {
          index = this.binarySearch(this.koSubtitle, currentTime)
          this.setSubcount(index)
          this.setLocalStorageSubcount()
          if (currentTime >= this.koSubtitle[this.subcount].start && currentTime < this.koSubtitle[this.subcount].end) {
            this.subtitleStart(this.subcount)
          }
        } else {
          index = this.binarySearch(this.subtitle, currentTime)
          this.setSubcount(index)
          this.setLocalStorageSubcount()
          if (currentTime >= this.subtitle[this.subcount].start && currentTime < this.subtitle[this.subcount].end) {
            this.subtitleStart(this.subcount)
          }
        }
      },
      onPlay () {
        this.setPlay(true)
      },
      onPause () {
        this.setPlay(false)
      },
      playControl () {
        if (!this.isMedia) return
        if (this.player.paused) {
          this.player.play()
          this.onPlay()
          this.playTimeout = setTimeout(() => {
            this.setViewMediaContr(false)
          }, 3000)
        } else {
          this.player.pause()
          this.onPause()
          this.setViewMediaContr(true)
          clearTimeout(this.playTimeout)
        }
      },
      repeat () {
        let start
        if (this.language === 'en') {
          if (!this.isSubtitle) return
          start = this.subtitle[this.subcount].start
        } else {
          if (!this.isKoSubtitle) return
          start = this.koSubtitle[this.subcount].start
        }
        this.setCurrentTime(start)
        this.player.currentTime = start
        this.player.play()
        this.onPlay()
      },
      skipPrev () {
        let prev
        let prevSubcount
        if (this.language === 'en') {
          if (!this.isSubtitle || this.subcount === 0) return
          prevSubcount = this.subcount - 1
          this.setSubcount(prevSubcount)
          prev = this.subtitle[prevSubcount].start
        } else {
          if (!this.isKoSubtitle || this.subcount === 0) return
          prevSubcount = this.subcount - 1
          this.setSubcount(prevSubcount)
          prev = this.koSubtitle[prevSubcount].start
        }
        this.setCurrentTime(prev)
        this.player.currentTime = prev
        this.setLocalStorageSubcount()
      },
      skipNext () {
        let next
        if (this.language === 'en') {
          if (!this.isSubtitle || this.subcount >= this.subtitleMaxIndex) return
          this.setSubcount(this.subcount + 1)
          next = this.subtitle[this.$store.state.subcount].start
        } else {
          if (!this.isKoSubtitle || this.subcount >= this.koSubtitleMaxIndex) return
          this.setSubcount(this.subcount + 1)
          next = this.koSubtitle[this.$store.state.subcount].start
        }
        this.setCurrentTime(next)
        this.player.currentTime = next
        this.setLocalStorageSubcount()
      },
      timeRepeat () {
        if (this.subcount === 0) return
        if (this.language === 'en') {
          if (this.player.currentTime - this.subtitle[this.subcount].start >= 1) {
            const start = this.subtitle[this.subcount].start
            this.setCurrentTime(start)
            this.player.currentTime = start
          } else {
            const prevSubcount = this.subcount - 1
            this.setSubcount(prevSubcount)
            this.player.currentTime = this.subtitle[prevSubcount].start
          }
        } else {
          if (this.player.currentTime - this.koSubtitle[this.subcount].start >= 1) {
            const start = this.koSubtitle[this.subcount].start
            this.setCurrentTime(start)
            this.player.currentTime = start
          } else {
            const prevSubcount = this.subcount - 1
            this.setSubcount(prevSubcount)
            this.player.currentTime = this.subtitle[prevSubcount].start
          }
        }
      },
      sectionRepeat (currentTime, target) {
        if (this.language === 'en') {
          if (currentTime > this.subtitle[this.subcount].end) {
            const start = this.subtitle[this.subcount].start
            this.setCurrentTime(start)
            target.currentTime = start
          }
        } else {
          if (currentTime > this.koSubtitle[this.subcount].end) {
            const start = this.koSubtitle[this.subcount].start
            this.setCurrentTime(start)
            target.currentTime = start
          }
        }
      },
      setVideoSize () {
        const UserMedia = this.$refs['UserMedia']
        const innerWidth = window.innerWidth

        if (this.$store.state.isFullScreen) {
          UserMedia.style.width = '100%'
          UserMedia.style.height = '100%'
        } else {
          if (innerWidth > 800) {
            UserMedia.style.width = '60%'
            UserMedia.style.height = '500px'
          } else if (innerWidth > 600) {
            UserMedia.style.width = '100%'
            UserMedia.style.height = '400px'
          } else {
            UserMedia.style.width = '100%'
            UserMedia.style.height = '240px'
          }
        }
      },
      fullScreenHandler () {
        const UserMedia = this.$refs['UserMedia']
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
          UserMedia.style.width = '100%'
          UserMedia.style.height = '100%'
          if (UserMedia.requestFullScreen) {
            UserMedia.requestFullScreen()
          } else if (UserMedia.webkitRequestFullScreen) {
            UserMedia.webkitRequestFullScreen()
          } else if (UserMedia.mozRequestFullScreen) {
            UserMedia.mozRequestFullScreen()
          } else if (UserMedia.msRequestFullScreen) {
            UserMedia.msRequestFullScreen()
          }
        } else {
          const width = window.innerWidth
          if (width > 700) {
            UserMedia.style.width = '60%'
            UserMedia.style.height = '500px'
          } else if (width > 600) {
            UserMedia.style.width = '100%'
            UserMedia.style.height = '400px'
          } else {
            UserMedia.style.width = '100%'
            UserMedia.style.height = '240px'
          }
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
          }
        }
      },
      controlMouseMove (event) {
        this.onMouseMove(event)
      },
      setMediaCurrentTime (val) {
        this.setCurrentTime(val)
        this.player.currentTime = val
      },
      binarySearch (arr, data) {
        let upperBound = arr.length - 1
        let lowerBound = 0
        let mid = -1
        while (lowerBound <= upperBound) {
          mid = Math.floor((upperBound + lowerBound) / 2)
          if (arr[mid].start < data) {
            lowerBound = mid + 1
          } else if (arr[mid].start > data) {
            upperBound = mid - 1
          } else {
            return mid
          }
        }
        if (lowerBound === mid && (mid - 1) !== -1) mid = mid - 1
        return mid
      }
    }
  }
</script>

<style>
  @import '../../styles/MediaView/UserMedia.css';
</style>
