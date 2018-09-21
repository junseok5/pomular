<template>
  <div class="YoutubeMenu">
    <div class="channel-list">
      <ul>
        <router-link :to="category.path" v-for="(category, index) in categoryList">
          <li @click="colorChange">
            {{ category.name }}
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['categoryList'],
    methods: {
      colorChange (event) {
        const listItems = document.querySelectorAll('.channel-list ul li')
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].className = ''
        }
        event.target.classList.add('active-category')
      }
    }
  }
</script>

<style>
  @import '../../../styles/YoutubeList/YoutubeMenu/YoutubeMenu.css'
</style>
