<template>
  <div class="HeaderInfo">
    <img src="../../assets/logo_pomular_8_32.png" align="center" draggable="false" />
    {{ headerInfo }}
  </div>
</template>

<script>
  export default {
    props: {
      headerInfo: {
        type: String,
        default: '홈'
      }
    }
  }
</script>

<style>
  @import '../../styles/Header/HeaderInfo.css'
</style>
