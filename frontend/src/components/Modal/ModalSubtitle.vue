<template>
  <Modal v-if="showModalSubtitle">
    <h3 class="headerModal" slot="header">
      자막
    </h3>
    <div class="p-modal-body" slot="body">
      <div class="p-select-file">
        <div class="p-file">
          <label>
            <font-awesome-icon icon="closed-captioning" />
            영어 자막
            <input type="file" accept=".srt" ref="en-subtitle" @change="readSRT('en')" />
          </label>
        </div>
      </div>
      <div class="p-select-file">
        <div class="p-file">
          <label>
            <font-awesome-icon icon="closed-captioning" />
            한국어 자막
            <input type="file" accept=".srt" ref="ko-subtitle" @change="readSRT('ko')" />
          </label>
        </div>
      </div>
      <div class="p-select-form">
        현재 .srt 형식의 파일만 지원합니다.
      </div>
    </div>
    <div class="footerModal" slot="footer">
      <div class="footerButton ms-button" @click="setShowModalSubtitle(false)">
        닫기
      </div>
    </div>
  </Modal>
</template>

<script>
  import Modal from '../common/Modal.vue'
  import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      'Modal': Modal
    },
    computed: {
      ...mapState(['showModalSubtitle'])
    },
    methods: {
      ...mapMutations([
        'setShowModalSubtitle',
        'setShowLoading',
        'setLocalStorageSubtitle',
        'setSubtitle',
        'setKoSubtitle',
        'setLocalStorageKoSubtitle'
      ]),
      async readSRT (language) {
        let file
        if (language === 'en') {
          file = this.$refs['en-subtitle'].files[0]
        } else {
          file = this.$refs['ko-subtitle'].files[0]
        }

        let reader = new FileReader()
        let subtitle = []
        reader.onload = () => {
          this.setShowLoading(true)
          let text = reader.result
          let mode = 0 // 0 is skip(because of index), 1 is time, 2 is content
          let start = '00:00:00,000'
          let end = '00:00:00,000'
          let content = ''
          let whiteSpaceChk = /^\s*$/
          let indexChk = /^[0-9]+$/
          let splitLine = text.split('\n')
          for (let i in splitLine) {
            if (whiteSpaceChk.test(splitLine[i])) {
              mode = 0
            } else if (mode === 0 || indexChk.test(splitLine[i])) {
              let obj = {
                start, end, content
              }
              subtitle.push(obj)
              content = ''
              mode = 1
              continue
            } else if (mode === 1) {
              let timeSplit = splitLine[i].split(' --> ')
              // start = timeSplit[0].split(',')[0]
              // end = timeSplit[1].split(',')[0]
              start = timeSplit[0]
              end = timeSplit[1]
              mode = 2
            } else if (mode === 2) {
              content += splitLine[i] + '<br>'
            }
          }
          this.arrayUnitConverter(subtitle)
          if (language === 'en') {
            this.setSubtitle(subtitle)
            this.setLocalStorageSubtitle()
          } else {
            this.setKoSubtitle(subtitle)
            this.setLocalStorageKoSubtitle()
          }
          this.setShowLoading(false)
          this.setShowModalSubtitle(false)
        }

        reader.readAsText(file)
      },
      arrayUnitConverter (arr) {
        for (let i = 0; i < arr.length; i++) {
          let start = arr[i].start
          let end = arr[i].end
          arr[i].start = this.unitConverter(start)
          arr[i].end = this.unitConverter(end)
        }
      },
      unitConverter (time) {
        let splitDp = time.split(',')
        let splitTime = splitDp[0].split(':')
        let hours = parseInt(splitTime[0])
        let minutes = parseInt(splitTime[1])
        let seconds = parseInt(splitTime[2])
        let dp = parseInt(splitDp[1]) / 1000
        let result = (hours * 3600) + (minutes * 60) + seconds + dp
        return result
      }
    }
  }
</script>

<style>
  @import '../../styles/Modal/ModalSubtitle.css'
</style>
