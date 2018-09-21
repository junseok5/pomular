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
  .ErrorView {
    position: fixed;
    color: #A94444;
    font-weight: bold;
    height: 30px;
    padding-top: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #FFA7A7;
  }

  @media screen and (max-width: 700px) {
    .ErrorView {
      bottom: 50px;
    }
  }
</style>
