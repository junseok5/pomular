<template>
  <Modal v-if="showModalVideo" @close="setShowModalVideo(false)">
    <h3 class="headerModal" slot="header">
      <div class="m-back" v-show="!notSelect" @click="setNotSelect">
        <font-awesome-icon icon="arrow-left" />
      </div>
      비디오
    </h3>
    <div class="p-modal-body" slot="body" v-show="notSelect">
      <div class="p-select-file">
        <div class="p-file">
          <label>
            <font-awesome-icon icon="video" />
            비디오 파일
            <input type="file" accept="video/*" ref="videoFile" @change="createObjectURL" />
          </label>
        </div>
      </div>
      <div class="p-select-file" @click="setNotSelect">
        <font-awesome-icon icon="share-alt" />
        비디오 URL
      </div>
    </div>
    <div class="video-modal-body" slot="body" v-show="!notSelect">
      <input type="text" ref="videoURL" v-model="url" placeholder="비디오 URL" />
      <div class="chk-autoLoad" >
        <label class="container">
          페이지 접속 시 비디오 자동 로드
          <input type="checkbox" ref="autoLoad" v-model="autoLoad" />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <div class="footerModal" slot="footer">
      <div class="applyModal footerButton" @click="applyVideoURL">
        적용
      </div>
      <div class="closeModal footerButton" @click="setShowModalVideo(false)">
        닫기
        <font-awesome-icon icon="times" />
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
        autoLoad: true,
        url: '',
        notSelect: true
      }
    },
    computed: {
      ...mapState(['showModalVideo'])
    },
    methods: {
      ...mapMutations([
        'createObjectURL',
        'removeLocalStorageObjectURL',
        'setShowModalVideo',
        'setLocalStorageObjectURL',
        'setObjectURL',
        'setIsMedia'
      ]),
      setNotSelect () {
        this.notSelect = !this.notSelect
      },
      createObjectURL () {
        let file = this.$refs['videoFile'].files[0]
        let objectURL = URL.createObjectURL(file)
        this.setObjectURL(objectURL)
        this.removeLocalStorageObjectURL()
        this.setIsMedia(true)
        this.setShowModalVideo(false)
      },
      applyVideoURL () {
        if (this.url === '') {
          alert('url을 입력하여 주세요.')
          return
        }
        if (this.autoLoad) {
          this.setLocalStorageObjectURL(this.url)
        }
        this.setObjectURL(this.url)
        this.setShowModalVideo(false)
        this.setIsMedia(true)
      }
    }
  }
</script>

<style>
  @import '../../styles/Modal/ModalVideo.css'
</style>
