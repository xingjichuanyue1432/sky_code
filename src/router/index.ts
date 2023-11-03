
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '../views/login/login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( '../views/register/register.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import( '../views/users/index.vue'),
    children:[

      {path:'/users/first', name: 'users/first',component: () => import( '../views/users/first.vue')},
      {path:'/users/money', name: 'users/money',component: () => import( '../views/users/money.vue')},
      {path:'/users/information', name: 'users/information',component: () => import( '../views/users/information.vue')}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  const islogin=localStorage.app1_token?true:false;
  if(to.path=='/login' ||to.path=='/register')
  next()
  else{
    islogin?next():next('/login')
  }
})

export default router
