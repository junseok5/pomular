<template>
  <Modal v-show="$store.state.showModalSetting" @close="setShowModalSetting(false)">
    <h3 class="headerModal" slot="header">
      <font-awesome-icon icon="cog" />
      설정
    </h3>
    <div class="bodyModal" slot="body">
      <table>
        <tr>
          <td class="title" colspan="2">일반 설정</td>
        </tr>
        <tr>
          <td>자막</td>
          <td>
            <label class="switch">
              <input type="checkbox" @change="showSubtitleHandler"
                v-model="subCheckbox"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr v-if="deviceType === 'Mobile'">
          <td class="title" colspan="2">컨트롤러 보이기/숨기기</td>
        </tr>
        <tr v-if="deviceType === 'Mobile'">
          <td>자막 변환</td>
          <td>
            <label class="switch">
              <input type="checkbox" @change="contrViewSubConverter"
                v-model="contrCheckbox.subConverter"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr v-if="deviceType === 'Mobile'">
          <td>구간 반복</td>
          <td>
            <label class="switch">
              <input type="checkbox" @change="contrViewSRHandler"
                v-model="contrCheckbox.sectionRepeat"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr v-if="deviceType === 'Mobile'">
          <td>재생/정지</td>
          <td>
            <label class="switch">
              <input type="checkbox" @change="contrViewPlayHandler"
                v-model="contrCheckbox.play"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr v-if="deviceType === 'Mobile'">
          <td>반복</td>
          <td>
            <label class="switch">
              <input type="checkbox" @change="contrViewRepeatHandler"
                v-model="contrCheckbox.repeat"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr v-if="deviceType === 'Mobile'">
          <td>구간 점프</td>
          <td>
            <label class="switch">
              <input type="checkbox" @change="contrviewSC"
                v-model="contrCheckbox.sectionContr"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr>
          <td class="title" colspan="2">저장공간 설정</td>
        </tr>
        <tr>
          <td>비디오 URL 삭제</td>
          <td class="trash" @click="removeLocalStorageObjectURL"><font-awesome-icon icon="trash-alt" /></td>
        </tr>
        <tr>
          <td>자막 삭제</td>
          <td class="trash" @click="removeLocalStorageSubtitle"><font-awesome-icon icon="trash-alt" /></td>
        </tr>
      </table>
    </div>
    <div class="footerModal" slot="footer">
      <div class="footerButton closeSetting" @click="setShowModalSetting(false)">
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
    data () {
      return {
        subCheckbox: this.$store.state.showSubtitle,
        contrCheckbox: {
          subConverter: this.$store.state.contrView.subConverter,
          sectionRepeat: this.$store.state.contrView.sectionRepeat,
          play: this.$store.state.contrView.play,
          repeat: this.$store.state.contrView.repeat,
          sectionContr: this.$store.state.contrView.sectionContr
        }
      }
    },
    computed: {
      ...mapState([
        'deviceType',
        'isSectionRepeat',
        'showSubtitle',
        'contrView'
      ])
    },
    watch: {
      showSubtitle: function () {
        this.subCheckbox = this.showSubtitle
      },
      isSectionRepeat: function () {
        this.secRepCheckbox = this.isSectionRepeat
      }
    },
    methods: {
      ...mapMutations([
        'setShowModalSetting',
        'setShowSubtitle',
        'setContrViewSubConverter',
        'setLocalStorageContrViewSubConverter',
        'setContrViewSectionRepeat',
        'setLocalStorageContrViewSectionRepeat',
        'setContrViewPlay',
        'setLocalStorageContrViewPlay',
        'setContrViewRepeat',
        'setLocalStorageContrViewRepeat',
        'setContrViewSectionContr',
        'setLocalStorageContrViewSectionContr',
        'removeLocalStorageObjectURL',
        'removeLocalStorageSubtitle'
      ]),
      showSubtitleHandler () {
        this.setShowSubtitle(!this.showSubtitle)
      },
      contrViewSubConverter () {
        this.setContrViewSubConverter(this.contrCheckbox.subConverter)
        this.setLocalStorageContrViewSubConverter(this.contrCheckbox.subConverter)
      },
      contrViewSRHandler () {
        this.setContrViewSectionRepeat(this.contrCheckbox.sectionRepeat)
        this.setLocalStorageContrViewSectionRepeat(this.contrCheckbox.sectionRepeat)
      },
      contrViewPlayHandler () {
        this.setContrViewPlay(this.contrCheckbox.play)
        this.setLocalStorageContrViewPlay(this.contrCheckbox.play)
      },
      contrViewRepeatHandler () {
        this.setContrViewRepeat(this.contrCheckbox.repeat)
        this.setLocalStorageContrViewRepeat(this.contrCheckbox.repeat)
      },
      contrviewSC () {
        this.setContrViewSectionContr(this.contrCheckbox.sectionContr)
        this.setLocalStorageContrViewSectionContr(this.contrCheckbox.sectionContr)
      }
    }
  }
</script>

<style scoped>
  @import '../../styles/Modal/ModalSetting.css';
</style>
