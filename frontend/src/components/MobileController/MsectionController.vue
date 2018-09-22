<template>
  <div class="MsectionController controller">
    <div class="sectionPrev skipControl" @click="skipPrev">
      <font-awesome-icon icon="step-backward" />
    </div>
    <div class="sectionNext skipControl" @click="skipNext">
      <font-awesome-icon icon="step-forward" />
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      skipPrev () {
        this.$emit('skipPrev')
      },
      skipNext () {
        this.$emit('skipNext')
      }
    }
  }
</script>

<style scoped>
  @import '../../styles/components/MobileController/MsectionController.css';
</style>
