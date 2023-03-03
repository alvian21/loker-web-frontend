import Vue from 'vue'
import Router from 'vue-router'
import Helpers from "../components/Hepler/Helper";


Vue.mixin(Helpers)
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('../components/Auth/Auth'),
    redirect: '/login',
    children: [
      {
        path: '/login',
        name: 'login',
        meta: {
          title: 'Login | Loker Web'
        },
        component: () => import('../components/Auth/Login')
      }
    ]
  },
  {
    path: '/',
    redirect: '/login',
    component: () => import('../components/Layout/Layout'),
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: 'My Dashboard | Loker Web'
        },
        component: () => import('../components/Dashboard/Dashboard'),
      },

      {
        path: '/lowongan',
        name: 'lowongan',
        meta: {
          title: 'lowongan | Loker Web'
        },
        component: () => import('../components/Lowongan/Lowongan'),
      },

      {
        path: '/lowongan/create',
        name: 'lowongan-create',
        meta: {
          title: 'lowongan Create | Loker Web'
        },
        component: () => import('../components/Lowongan/Create'),
      },

      {
        path: '/lowongan/edit/:id',
        name: 'lowongan-edit',
        meta: {
          title: 'lowongan Edit | Loker Web'
        },
        component: () => import('../components/Lowongan/Edit'),
      },

    ]
  },

]


const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
 
  if (to.name !== "login" && !localStorage.getItem("token")) {
    next({ name: "login" });
  } else if (to.name === "login" && localStorage.getItem("token")) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
