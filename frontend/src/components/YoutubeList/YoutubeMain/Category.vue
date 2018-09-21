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
    @import '../../../styles/YoutubeList/YoutubeMain/Category.css'
</style>
