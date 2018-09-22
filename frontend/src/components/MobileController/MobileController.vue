<template>
  <div class="MobileController">
    <MsubtitleController
      v-if="contrView.subConverter"
      v-on:convertSubtitleContent="convertSubtitleContent"
    />
    <MsectionRepeatController
      v-if="contrView.sectionRepeat"
    />
    <MrepeatController
      v-if="contrView.repeat"
      v-on:repeat="repeat"
    />
    <MplayController
      v-if="contrView.play"
      v-on:playControl="playControl"
    />
    <MsectionController
      v-if="contrView.sectionContr"
      v-on:skipPrev="skipPrev"
      v-on:skipNext="skipNext"
    />
  </div>
</template>

<script>
  import MsubtitleController from './MsubtitleController'
  import MsectionRepeatController from './MsectionRepeatController'
  import MplayController from './MplayController'
  import MrepeatController from './MrepeatController'
  import MsectionController from './MsectionController'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      'MsubtitleController': MsubtitleController,
      'MsectionRepeatController': MsectionRepeatController,
      'MplayController': MplayController,
      'MrepeatController': MrepeatController,
      'MsectionController': MsectionController
    },
    computed: {
      ...mapState([
        'showSubtitle',
        'keyControl',
        'isSectionRepeat',
        'contrView',
        'isKoSubtitle',
        'language'
      ])
    },
    created () {
      document.onkeydown = event => {
        if (!this.keyControl) return
        // event.preventDefault()
        event = event || window.event
        const arrowLeft = 37
        const arrowDown = 40
        const arrowRight = 39
        const arrowUp = 38
        const a = 65
        const s = 83
        const d = 68
        const z = 90
        const k = 75
        const j = 74
        const l = 76

        if (event.keyCode === z) {
          this.repeat()
        } else if (event.keyCode === arrowLeft) {
          this.timeRepeat()
        } else if (event.keyCode === arrowDown || event.keyCode === s) {
          this.playControl()
        } else if (event.keyCode === a) {
          this.skipPrev()
        } else if (event.keyCode === d || event.keyCode === arrowRight) {
          this.skipNext()
        } else if (event.keyCode === k) {
          this.subtitleControl()
        } else if (event.keyCode === j || event.keyCode === arrowUp) {
          this.controlIsSectionRepeat(!this.isSectionRepeat)
        } else if (event.keyCode === l) {
          if (!this.isKoSubtitle && this.language === 'en') {
            this.setShowMessage({
              showMessage: true,
              messageText: '한글자막을 찾을 수 없습니다.',
              messageDelay: 1500
            })
          } else {
            this.setLanguage()
            this.convertSubtitleContent()
          }
        }
      }
    },
    methods: {
      ...mapMutations([
        'setShowSubtitle',
        'setIsSectionRepeat',
        'setLocalStorageIsSectionRepeat',
        'setShowMessage',
        'setLanguage'
      ]),
      playControl () {
        this.$emit('playControl')
      },
      repeat () {
        this.$emit('repeat')
      },
      subtitleControl () {
        this.setShowSubtitle(!this.showSubtitle)
      },
      skipPrev () {
        this.$emit('skipPrev')
      },
      skipNext () {
        this.$emit('skipNext')
      },
      timeRepeat () {
        this.$emit('timeRepeat')
      },
      controlIsSectionRepeat (val) {
        this.setIsSectionRepeat(val)
        this.setLocalStorageIsSectionRepeat(val)
      },
      convertSubtitleContent () {
        this.$emit('convertSubtitleContent')
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MobileController/MobileController.css';
</style>
