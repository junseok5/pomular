<template>
  <div class="Subtitle" v-show="showSubtitle" ref="subview"></div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'showSubtitle',
        'subtitleContent',
        'viewMediaContr'
      ])
    },
    watch: {
      subtitleContent () {
        this.$refs['subview'].innerHTML = this.subtitleContent
      },
      viewMediaContr () {
        const subview = this.$refs['subview'].style
        const width = window.innerWidth

        if (this.viewMediaContr) {
          if (width > 800) {
            subview.bottom = '54px'
          } else {
            subview.bottom = '45px'
          }
        } else {
          subview.bottom = '14px'
        }
      }
    }
  }
</script>

<style>
  @import '../../styles/components/MediaView/Subtitle.css';
</style>
