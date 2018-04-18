import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import EditPage from '@/components/EditPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
    	path: '/edit',
    	name: 'EditPage',
    	component: EditPage
    },
  ]
})
