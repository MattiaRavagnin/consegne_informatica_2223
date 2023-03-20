import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '../src/assets/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

import gAuth from 'vue3-google-oauth2'

let gauthClientId =  '431906524163-3pp0dqcajdq4i01s2khftq42gmk7i7tp.apps.googleusercontent.com' 


app
    .use(router) 
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(gAuth, {
      clientId: gauthClientId,
    })
    
    .mount('#app')
    

