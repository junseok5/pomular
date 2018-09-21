<template>
  <transition name="fade">
    <div class="Message" v-show="showMessage" ref="message">
      {{ messageText }}
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState(['showMessage']),
      ...mapState(['messageText']),
      ...mapState(['messageDelay'])
    },
    watch: {
      showMessage () {
        if (this.showMessage) {
          setTimeout(() => {
            this.setShowMessage({
              showMessage: false
            })
          }, this.messageDelay)
        }
      }
    },
    methods: {
      ...mapMutations(['setShowMessage'])
    }
  }
</script>

<style>
  @import '../../styles/common/Message.css'
</style>
