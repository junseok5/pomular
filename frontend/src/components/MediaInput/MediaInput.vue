<template>
  <div class="MediaInput">
    <div class="selectFile" @click="setShowModalVideo(true)">
        <label>
          <font-awesome-icon icon="video" />
          비디오
        </label>
    </div>
    <div class="selectFile" @click="setShowModalSubtitle(true)">
        <label>
          <font-awesome-icon icon="closed-captioning" />
          자막
        </label>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapMutations(['setObjectURL']),
      ...mapMutations(['removeLocalStorageObjectURL']),
      ...mapMutations(['setShowLoading']),
      ...mapMutations(['setSubtitle']),
      ...mapMutations(['setShowModalSubtitle']),
      ...mapMutations(['setShowModalVideo']),
      ...mapMutations(['setIsMedia'])
    }
  }
</script>

<style>
  @import '../../styles/MediaInput/MediaInput.css';
</style>
