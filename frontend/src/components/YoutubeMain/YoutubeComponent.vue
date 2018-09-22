<template>
  <div class="YoutubeComponent fadeIn animated" @click="moveTargetVideo">
    <div class="y-thumbnail">
      <img :src="source" draggable="false" />
      <div class="y-overay-time">
        {{ youtubeData.overayTime }}
      </div>
    </div>
    <div class="y-title" :title="youtubeData.title">
      {{ youtubeData.title }}
    </div>
    <div class="channel-name">
      {{ youtubeData.channelName }}
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: ['youtubeData'],
    data () {
      return {
        source: `https://img.youtube.com/vi/${this.youtubeData.youtubeId}/mqdefault.jpg`
      }
    },
    computed: {
      ...mapState(['idb'])
    },
    methods: {
      ...mapMutations([
        'setVideoMode',
        'setYoutubeId',
        'setLocalStorageYoutubeId',
        'setLocalStorageVideoMode',
        'setChannelName',
        'setLocalStorageChannelName',
        'setTitle',
        'setLocalStorageTitle'
      ]),
      moveTargetVideo () {
        this.setVideoMode('youtube')
        this.setLocalStorageVideoMode()
        this.setYoutubeId(this.youtubeData.youtubeId)
        this.setChannelName(this.youtubeData.channelName)
        this.setTitle(this.youtubeData.title)
        this.setLocalStorageYoutubeId()
        this.setLocalStorageChannelName(this.youtubeData.channelName)
        this.setLocalStorageTitle(this.youtubeData.title)
        this.addIDB(this.youtubeData, 'yvideos')
        localStorage.ysubcount = 0
        this.$router.push('/')
      },
      addIDB (yvideo, storeName) {
        let tx = this.idb.transaction(storeName, 'readwrite')
        let store = tx.objectStore(storeName)

        let request = store.put(yvideo)

        request.onerror = event => {
          console.error(request.error)
        }

        tx.onabort = () => {
          console.error(tx.error)
        }
      }
    }
  }
</script>

<style>
  @import '../../styles/components/YoutubeMain/YoutubeComponent.css'
</style>
