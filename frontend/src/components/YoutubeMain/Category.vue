<template>
  <div class="Channel">
    {{ categoryName }}
  </div>
</template>

<script>
  export default {
    props: ['categoryName']
  }
</script>

<style>
    @import '../../styles/components/YoutubeMain/Category.css'
</style>
