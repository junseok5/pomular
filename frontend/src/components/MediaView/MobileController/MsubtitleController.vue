<template>
  <div class="MsubtitleController controller" ref="lanContr" @click="convertLanguage">
    <font-awesome-icon icon="closed-captioning" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'language',
        'isKoSubtitle',
        'subcount',
        'ysubcount',
        'currentTime',
        'videoMode'
      ])
    },
    watch: {
      language () {
        this.convertColor()
      }
    },
    mounted () {
      this.convertColor()
    },
    methods: {
      ...mapMutations([
        'setLanguage',
        'setShowMessage',
        'subtitleStart'
      ]),
      convertColor () {
        const lanContr = this.$refs['lanContr']
        if (this.language === 'en') {
          lanContr.style.color = '#42B882'
        } else {
          lanContr.style.color = '#6799FF'
        }
      },
      convertLanguage () {
        if (!this.isKoSubtitle && this.language === 'en') {
          this.setShowMessage({
            showMessage: true,
            messageText: '한글자막을 찾을 수 없습니다.',
            messageDelay: 1500
          })
          return
        }
        this.setLanguage()
        this.$emit('convertSubtitleContent')
      }
    }
  }
</script>
