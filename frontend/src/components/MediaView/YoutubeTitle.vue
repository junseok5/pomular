<template>
  <transition name="fade">
    <div class="YoutubeTitle" v-show="viewMediaContr">
      <span>{{ title }}</span>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'viewMediaContr',
        'title'
      ])
    }
  }
</script>

<style>
  @import '../../styles/components/MediaView/YoutubeTitle.css'
</style>
