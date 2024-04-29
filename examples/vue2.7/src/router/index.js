import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

function createRouter() {
  return new VueRouter({
    routes: [
      {
        path: '/',
        redirect: '/index',
        component: Layout,
        name: 'main',
        meta: {
          title: '首页',
          icon: 'fa fa-yx-home',
        },
        children: [{
          path: 'index',
          name: 'index',
          component: () => import('@/views/Home.vue'),
          meta: {
            title: '首页',
          },
        },
        ],
      },
    ],
  })
}

const router = createRouter()
export default router
