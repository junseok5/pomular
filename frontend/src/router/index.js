import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Intro from '../pages/Intro'
import YoutubeList from '../pages/YoutubeList'
import Category from '../pages/Category'
import Error from '../pages/Error.404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/list',
      name: 'YoutubeList',
      component: YoutubeList
    },
    {
      path: '/list/:category',
      name: 'YoutubeCategory',
      component: YoutubeList
    },
    {
      path: '/category',
      name: 'Category list mobile',
      component: Category
    },
    {
      path: '*',
      name: '404',
      component: Error
    }
  ]
})
