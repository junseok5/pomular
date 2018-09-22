<template>
  <div class="Header" ref="header">
    <div class="logo">
      <router-link to="/">
        <div class="logo_content">
          <img src="../../assets/logo_pomular_8_128.png" align="center" draggable="false" />
          <span>Pomular</span>
        </div>
      </router-link>
    </div>
    <div class="menu" ref="menu" @click="handleGapScroll">
      <ul>
        <li class="menu-intro" @click="clearTimer">
          <router-link to="/intro">소개</router-link>
        </li>
        <li @click="clearTimer">
          <router-link to="/list">채널 목록</router-link>
        </li>
        <li @click="clearTimer">
          <router-link to="/">학습 공간</router-link>
        </li>
        <li class="menu-cog" @click="setShowModalSetting(true)">
          <font-awesome-icon icon="cog" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        showMenu: false
      }
    },
    computed: {
      ...mapState(['gapScroll'])
    },
    watch: {
      gapScroll () {
        this.handleGapScroll()
      }
    },
    mounted () {
      this.handleGapScroll()
    },
    methods: {
      ...mapMutations(['setShowModalSetting']),
      ...mapMutations(['clearTimer']),
      handleGapScroll () {
        const header = this.$refs['header']
        if (this.gapScroll > 0) {
          header.style.background = '#333'
        } else if (this.gapScroll === 0) {
          header.style.background = 'none'
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../styles/components/Header/Header.css';
</style>
