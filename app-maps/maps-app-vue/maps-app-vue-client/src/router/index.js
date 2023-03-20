import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Enter from '../views/Enter.vue'
import MapBox from '../views/MapBox.vue'

const routes = [
  {
    path: '/map',
    name: 'Map',
    component: Enter
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Enter',
    component: Home
  },
  {
    path: '/mapbox',
    name: 'Mapbox',
    component: MapBox
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
