<template>
  <div class="Tabs">
    <router-link to="/list">
      <div class="tab" ref="tab0" @click="activeHandler(0)">
        <font-awesome-icon icon="home" />
      </div>
    </router-link>

    <router-link to="/category">
      <div class="tab" ref="tab1" @click="activeHandler(1)">
        <font-awesome-icon icon="th-large" />
      </div>
    </router-link>

    <router-link to="/">
      <div class="tab" ref="tab2" @click="activeHandler(2)">
        <font-awesome-icon icon="caret-square-right" />
      </div>
    </router-link>

    <div class="tab" ref="tab3" @click="setShowModalSetting(true)">
      <font-awesome-icon icon="cog" />
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        tab: [],
        activeIndex: -1
      }
    },
    mounted () {
      this.initActiveIndex()
    },
    methods: {
      ...mapMutations([
        'setShowModalSetting',
        'clearTimer'
      ]),
      activeHandler (index) {
        this.clearTimer()
        if (this.activeIndex !== -1) {
          const prevTab = this.$refs['tab' + this.activeIndex]
          prevTab.style.color = '#BDBDBD'
        }
        this.activeIndex = index
        const activeTab = this.$refs['tab' + index]
        activeTab.style.color = '#fff'
      },
      initActiveIndex () {
        const path = this.$route.path
        if (path.indexOf('/list') !== -1) {
          this.activeHandler(0)
        } else if (path.indexOf('/category') !== -1) {
          this.activeHandler(1)
        } else if (path === '/') {
          this.activeHandler(2)
        }
      }
    }
  }
</script>

<style>
  @import '../../styles/components/Tabs/Tabs.css'
</style>
