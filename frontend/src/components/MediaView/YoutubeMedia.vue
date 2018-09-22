<template>
  <div class="YoutubeMedia" ref="YoutubeMedia" :width="width" :height="height" @resize="setVideoSize">
    <MediaLoading />
    <youtube
      :video-id="youtubeId"
      player-width="100%"
      :player-height="height"
      :player-vars="yoptions"
      @ready="ready"
      @playing="playing"
      @paused="paused"
    />
    <MobileController
      v-show="deviceType === 'Mobile'"
      v-on:playControl="playControl"
      v-on:repeat="repeat"
      v-on:skipPrev="skipPrev"
      v-on:skipNext="skipNext"
      v-on:timeRepeat="timeRepeat"
      v-on:convertSubtitleContent="convertSubtitleContent"
    />
    <MediaController
      v-on:fullScreenHandler="fullScreenHandler"
      v-on:setMediaCurrentTime="setMediaCurrentTime"
    />
    <TimeViewController />
    <YoutubeTitle />
    <div class="detectMouseMove"
      @click="controlScreenClick"
      @mousemove="controlMouseMove"
    />
    <Subtitle />
    <Message />
    <ErrorView :message="errorSubtitle" />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import TimeViewController from '@/components/MediaController/TimeViewController'
  import MediaController from '@/components/MediaController/MediaController'
  import YoutubeTitle from './YoutubeTitle'
  import MobileController from '@/components/MobileController/MobileController'
  import Subtitle from './Subtitle'
  import Message from '@/components/common/Message.vue'
  import MediaLoading from '@/components/common/MediaLoading.vue'
  import ErrorView from '@/components/common/ErrorView'

  export default {
    name: 'YoutubeMedia',
    components: {
      'MediaController': MediaController,
      'MobileController': MobileController,
      'TimeViewController': TimeViewController,
      'YoutubeTitle': YoutubeTitle,
      'Subtitle': Subtitle,
      'Message': Message,
      'MediaLoading': MediaLoading,
      'ErrorView': ErrorView
    },
    data () {
      return {
        width: '100%',
        height: '500px',
        yoptions: {
          'controls': 0,
          'showinfo': 0,
          'rel': 0,
          'autohide': 0
        },
        errorSubtitle: '자막을 불러오는데 실패하였습니다.',
        initPlay: false,
        scrFirstClick: true,
        db: '',
        playTimeout: undefined
      }
    },
    computed: {
      ...mapState([
        'youtubeId',
        'deviceType',
        'viewMediaContr',
        'isFullScreen',
        'orientation',
        'currentTime',
        'youtubeSubtitle',
        'ysubcount',
        'subtitle',
        'koSubtitle',
        'isSubtitle',
        'isSectionRepeat',
        'showSubtitle',
        'language',
        'isKoSubtitle',
        'idb',
        'isIdb',
        'channelName'
      ]),
      ...mapGetters([
        'subtitleMaxIndex'
      ])
    },
    watch: {
      isFullScreen () {
        this.setVideoSize()
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
      language () {
        if (this.language === 'en') {
          this.setShowMessage({
            showMessage: true,
            messageText: '영어자막',
            messageDelay: 800
          })
        } else {
          this.setShowMessage({
            showMessage: true,
            messageText: '한글자막',
            messageDelay: 800
          })
        }
      },
      isIdb () {
        this.setShowMediaLoading(true)
        this.lookupIDB(this.youtubeId, 'en_subtitles')
        this.lookupIDB(this.youtubeId, 'ko_subtitles')
      }
    },
    created () {
      this.getLocalStorageYoutubeId()
      this.initSetVideoSize()
      this.initPlay = false
      this.setCurrentTime(0)
      this.setDuration(0)
      this.setPlay(false)
      this.setSubtitle([])
      this.setKoSubtitle([])
      this.setIsSubtitle(false)
      this.setIsKoSubtitle(false)
      this.setLanguage('en')
      this.setViewMediaContr(false)
      this.getLocalStorageYsubcount()
      this.getLocalStorageChannelName()
      this.getLocalStorageTitle()
      this.setCurrentTime(0)
      this.detectOrientation()
      this.createdLookupIDB()
      window.onresize = (event) => {
        this.detectOrientation()
        this.setVideoSize()
      }
    },
    methods: {
      ...mapMutations([
        'getLocalStorageYoutubeId',
        'setYoutubeId',
        'setSubtitle',
        'setKoSubtitle',
        'setViewMediaContr',
        'detectOrientation',
        'setCurrentTime',
        'setDuration',
        'onMouseMove',
        'setPlay',
        'showMediaControl',
        'setIsSubtitle',
        'setIsKoSubtitle',
        'setYsubcount',
        'setLocalStorageYsubcount',
        'subtitleStart',
        'subtitleEnd',
        'setShowMessage',
        'setShowMediaLoading',
        'getLocalStorageYsubcount',
        'setLocalStorageYoutubeId',
        'getLocalStorageYoutubeId',
        'setShowError',
        'setLocalStorageCurrentTime',
        'setTimer',
        'setLanguage',
        'getLocalStorageChannelName',
        'getLocalStorageTitle'
      ]),
      addIDB (subtitle, storeName) {
        let tx = this.idb.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)

        let request = store.put(subtitle)

        request.onerror = event => {
          console.error(request.error)
        }

        tx.onabort = () => {
          console.error(tx.error)
        }
      },
      lookupIDB (youtubeId, storeName) {
        let tx = this.idb.transaction(storeName, 'readonly')
        let store = tx.objectStore(storeName)
        let index = store.index('by_youtubeId')

        let request = index.get(youtubeId)

        request.onsuccess = () => {
          let matching = request.result
          if (matching !== undefined) {
            if (storeName === 'en_subtitles') {
              this.saveEnSubtitle(matching.subtitle)
            } else {
              this.saveKoSubtitle(matching.subtitle)
            }
            this.setShowMediaLoading(false)
          } else {
            if (storeName === 'en_subtitles') {
              this.reqYoutubeSubtitle()
            } else {
              this.reqKoSubtitle()
            }
          }
        }

        request.onerror = event => {
          console.error(request.error)
          if (storeName === 'en_subtitles') {
            this.reqYoutubeSubtitle()
          } else {
            this.reqKoSubtitle()
          }
        }

        tx.onabort = () => {
          console.error(tx.error)
          if (storeName === 'en_subtitles') {
            this.reqYoutubeSubtitle()
          } else {
            this.reqKoSubtitle()
          }
        }
      },
      createdLookupIDB () {
        if (this.idb) {
          this.lookupIDB(this.youtubeId, 'en_subtitles')
          this.lookupIDB(this.youtubeId, 'ko_subtitles')
        }
      },
      saveEnSubtitle (subtitle) {
        this.setSubtitle(subtitle)
        this.setIsSubtitle(true)
      },
      saveKoSubtitle (subtitle) {
        this.setKoSubtitle(subtitle)
        this.setIsKoSubtitle(true)
      },
      initSetVideoSize () {
        if (window.innerWidth > 800) {
          this.height = '500px'
        } else if (window.innerWidth > 600) {
          this.height = '400px'
        } else {
          this.height = '240px'
        }
      },
      reqYoutubeSubtitle () {
        const baseURI = 'https://video.google.com/timedtext?hl=en'
        const langEn = '&lang=en'
        const id = `&v=${this.youtubeId}`
        this.$http.get(baseURI + langEn + id).then((res) => {
          if (this.subtitle.length !== 0) {
            this.setSubtitle([])
          }
          const subtitleDom = this.parseYoutubeSubtitle(res.data)
          this.saveYoutubeSubtitle(subtitleDom, 'en')
        }).catch((error) => {
          console.error(error)
          this.setShowMediaLoading(false)
          this.setShowError({
            showError: true,
            errorMessage: '영어 자막을 불러오는데 실패하였습니다.',
            errorDelay: 3000
          })
        })
      },
      saveYoutubeSubtitle (arr, language) {
        let youtubeSubtitle = []
        youtubeSubtitle.push({
          start: 0,
          end: 0,
          content: ''
        })
        for (let i = 0; i < arr.length; i++) {
          youtubeSubtitle.push({
            start: Number(arr[i].attributes.start.value),
            end: Number(arr[i].attributes.start.value) + Number(arr[i].attributes.dur.value),
            content: arr[i].textContent
          })
        }
        const subtitle = {
          youtubeId: this.youtubeId,
          subtitle: youtubeSubtitle
        }

        if (language === 'en') {
          this.addIDB(subtitle, 'en_subtitles')
          this.setSubtitle(youtubeSubtitle)
          this.setIsSubtitle(true)
        } else {
          this.addIDB(subtitle, 'ko_subtitles')
          this.setKoSubtitle(youtubeSubtitle)
          this.setIsKoSubtitle(true)
        }

        this.setShowMediaLoading(false)
      },
      parseYoutubeSubtitle (data) {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, 'text/xml')
        const subtitleDom = xmlDoc.documentElement.getElementsByTagName('text')
        return subtitleDom
      },
      reqKoSubtitle () {
        if (this.channelName === 'TED') {
          const baseURI = 'https://video.google.com/timedtext?hl=en'
          const langEn = '&lang=ko'
          const id = `&v=${this.youtubeId}`
          this.$http.get(baseURI + langEn + id).then((res) => {
            if (this.koSubtitle.length !== 0) {
              this.setKoSubtitle([])
            }
            const subtitleDom = this.parseYoutubeSubtitle(res.data)
            this.saveYoutubeSubtitle(subtitleDom, 'ko')
          }).catch((error) => {
            console.error(error)
            this.setShowMediaLoading(false)
            this.setShowError({
              showError: true,
              errorMessage: '한글 자막을 불러오는데 실패하였습니다.',
              errorDelay: 3000
            })
          })
        } else {
          this.$http.get(`/subtitles/${this.youtubeId}/ko`).then((res) => {
            if (res.data === 'NOT_DATA') {
              this.setShowError({
                showError: true,
                errorMessage: '한글 자막을 불러오는데 실패하였습니다.',
                errorDelay: 3000
              })
              this.setShowMediaLoading(false)
              return
            }

            const subtitle = {
              youtubeId: res.data.youtubeId,
              subtitle: res.data.t_subtitle
            }

            this.addIDB(subtitle, 'ko_subtitles')
            this.setKoSubtitle(res.data.t_subtitle)
            this.setIsKoSubtitle(true)
            this.setShowMediaLoading(false)
          }).catch((error) => {
            console.error(error)
            this.setShowMediaLoading(false)
            this.setShowError({
              showError: true,
              errorMessage: '한글 자막을 불러오는데 실패하였습니다.',
              errorDelay: 3000
            })
          })
        }
      },
      setVideoSize () {
        let innerWidth = window.innerWidth
        let innerHeight = window.innerHeight
        const youtubeMedia = this.$refs['YoutubeMedia']
        if (this.$store.state.isFullScreen) {
          youtubeMedia.style.width = '100%'
          youtubeMedia.style.height = '100%'
          this.height = innerHeight
        } else {
          if (innerWidth > 800) {
            youtubeMedia.style.width = '60%'
            this.height = '500px'
          } else if (innerWidth > 600) {
            youtubeMedia.style.width = '100%'
            this.height = '400px'
          } else {
            youtubeMedia.style.width = '100%'
            this.height = '240px'
          }
        }
      },
      ready (event) {
        this.player = event.target
        this.setDuration(this.player.getDuration())
        this.setVideoSize()
      },
      playing (event) {
        if (!this.initPlay) {
          this.initPlay = true
          if (this.ysubcount !== 0) {
            const initTime = this.subtitle[this.ysubcount].start
            this.player.seekTo(initTime)
            this.subtitleStart(this.ysubcount)
          }
        }
        this.setPlay(true)
        this.timeUpdate()
      },
      paused () {
        this.setPlay(false)
      },
      timeUpdate () {
        let timer = setInterval(() => {
          if (this.player.getPlayerState() === 1) {
            let currentTime = this.player.getCurrentTime()
            this.setCurrentTime(currentTime)
            if (!this.isSubtitle) return
            if (this.ysubcount === this.subtitleMaxIndex) return
            if (this.isSectionRepeat && this.ysubcount !== 0) {
              this.sectionRepeat(currentTime)
              return
            }
            if (currentTime >= this.subtitle[this.ysubcount].end) {
              this.subtitleEnd()
            }
            if (currentTime >= this.subtitle[this.ysubcount + 1].start) {
              this.setYsubcount(this.ysubcount + 1)
              this.setLocalStorageYsubcount()
              this.subtitleStart(this.ysubcount)
            }
          } else {
            clearInterval(timer)
          }
        }, 100)
        this.setTimer(timer)
      },
      convertSubtitleContent () {
        const currentTime = this.currentTime
        if (currentTime >= this.subtitle[this.ysubcount].start && currentTime < this.subtitle[this.ysubcount].end) {
          this.subtitleStart(this.ysubcount)
        }
      },
      setMediaCurrentTime (val) {
        if (this.player.getPlayerState() === 5) {
          this.player.playVideo()
          return
        }
        const currentTime = val
        this.setCurrentTime(currentTime)
        this.player.seekTo(currentTime)
        if (!this.isSubtitle) return
        let index = this.binarySearch(this.subtitle, currentTime)
        this.setYsubcount(index)
        this.setLocalStorageYsubcount()
        if (currentTime >= this.subtitle[index].start && currentTime < this.subtitle[index].end) {
          this.subtitleStart(index)
        } else if (currentTime >= this.subtitle[index].end || currentTime < this.subtitle[index].start) {
          this.subtitleEnd()
        }
      },
      playControl () {
        if (this.player.getPlayerState() === 2) {
          this.player.playVideo()
          this.playTimeout = setTimeout(() => {
            this.setViewMediaContr(false)
          }, 3000)
        } else if (this.player.getPlayerState() === 1) {
          this.player.pauseVideo()
          this.setViewMediaContr(true)
          clearTimeout(this.playTimeout)
        } else if (this.player.getPlayerState() === 5) {
          this.player.playVideo()
          this.playTimeout = setTimeout(() => {
            this.setViewMediaContr(false)
          }, 3000)
        }
      },
      repeat () {
        if (!this.isSubtitle) return
        const start = this.subtitle[this.ysubcount].start
        this.setCurrentTime(start)
        this.player.seekTo(start)
        this.player.playVideo()
        this.subtitleStart(this.ysubcount)
      },
      skipPrev () {
        if (this.ysubcount === 0 || !this.isSubtitle) return
        if (this.player.getPlayerState() === 5) {
          this.player.playVideo()
          return
        }
        const prevSubcount = this.ysubcount - 1
        this.setYsubcount(prevSubcount)
        this.setLocalStorageYsubcount()
        const prev = this.subtitle[prevSubcount].start
        this.setCurrentTime(prev)
        this.player.seekTo(prev)
        this.subtitleStart(prevSubcount)
      },
      skipNext () {
        if (this.ysubcount >= this.subtitleMaxIndex || !this.isSubtitle) return
        if (this.player.getPlayerState() === 5) {
          this.player.playVideo()
          return
        }
        const nextSubcount = this.ysubcount + 1
        this.setYsubcount(nextSubcount)
        this.setLocalStorageYsubcount()
        const next = this.subtitle[nextSubcount].start
        this.setCurrentTime(next)
        this.player.seekTo(next)
        this.subtitleStart(nextSubcount)
      },
      timeRepeat () {
        if (this.ysubcount === 0 || !this.isSubtitle) return
        if (this.player.getCurrentTime() - this.subtitle[this.ysubcount].start >= 1) {
          const start = this.subtitle[this.ysubcount].start
          this.setCurrentTime(start)
          this.player.seekTo(start)
        } else {
          const prevSubcount = this.ysubcount - 1
          const start = this.subtitle[prevSubcount].start
          this.setYsubcount(prevSubcount)
          this.setLocalStorageYsubcount()
          this.player.seekTo(start)
        }
        this.subtitleStart(this.ysubcount)
      },
      sectionRepeat (currentTime) {
        if (!this.isSubtitle) return
        if (currentTime > this.subtitle[this.ysubcount].end) {
          const start = this.subtitle[this.ysubcount].start
          this.setCurrentTime(start)
          this.player.seekTo(start)
          this.subtitleStart(this.ysubcount)
        }
      },
      controlScreenClick () {
        if (this.deviceType === 'PC') {
          this.playControl()
        } else {
          if (this.scrFirstClick) {
            this.playControl()
            this.scrFirstClick = false
            return
          }
          this.showMediaControl()
        }
      },
      fullScreenHandler () {
        const YoutubeMedia = this.$refs['YoutubeMedia']
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
          if (YoutubeMedia.requestFullScreen) {
            YoutubeMedia.requestFullScreen()
          } else if (YoutubeMedia.webkitRequestFullScreen) {
            YoutubeMedia.webkitRequestFullScreen()
          } else if (YoutubeMedia.mozRequestFullScreen) {
            YoutubeMedia.mozRequestFullScreen()
          } else if (YoutubeMedia.msRequestFullScreen) {
            YoutubeMedia.msRequestFullScreen()
          }
        } else {
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
  @import '../../styles/components/MediaView/YoutubeMedia.css'
</style>
