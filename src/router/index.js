import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer_Detail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    }, {
      path: '/singer',
      component: Singer,
      children:[{
        path: ':id',
        component: Singer_Detail
      }]
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/search',
      component: Search
    }
  ]
})
