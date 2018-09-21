<template>
  <div class="MsectionRepeatController controller" ref="secReContr" @click="controlIsSectionRepeat">
    <font-awesome-icon icon="sync-alt" />
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState(['isSectionRepeat'])
    },
    watch: {
      isSectionRepeat () {
        this.reactIsSectionRepeat()
      }
    },
    mounted () {
      this.reactIsSectionRepeat()
    },
    methods: {
      ...mapMutations(['setIsSectionRepeat']),
      reactIsSectionRepeat () {
        const secReContr = this.$refs['secReContr']
        this.isSectionRepeat ? secReContr.style.color = '#42B882' : secReContr.style.color = 'white'
      },
      controlIsSectionRepeat (event) {
        this.setIsSectionRepeat(!this.isSectionRepeat)
      }
    }
  }
</script>

<style>
  @import '../../../styles/MediaView/MobileController/MsectionRepeatController.css'
</style>
