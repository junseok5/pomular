<template>
  <transition name="fade">
    <div class="ErrorView" v-show="showError">
      {{ errorMessage }}
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'showError',
        'errorMessage',
        'errorDelay'
      ])
    },
    watch: {
      showError () {
        if (this.showError) {
          setTimeout(() => {
            this.setShowError({
              showError: false
            })
          }, this.errorDelay)
        }
      }
    },
    methods: {
      ...mapMutations(['setShowError'])
    }
  }
</script>

<style>
@import '../../styles/common/ErrorView.css';
</style>
