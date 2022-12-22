import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '../src/assets/tailwind.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


createApp(App)
    .use(router)
    .mount('#app')
    .component('font-awesome-icon', FontAwesomeIcon)
