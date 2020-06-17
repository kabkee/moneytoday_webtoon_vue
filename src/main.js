import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import Vue2TouchEvents from 'vue2-touch-events'
import { localStorage } from './plugins/localStorage';

import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Import F7 Styles
import 'framework7/css/framework7.css';
// Import Icons and App Custom Styles
import './css/icons.css';
import './css/app.css';

Framework7.use(Framework7Vue)

Vue.use(Vue2TouchEvents)

Vue.prototype.$axios = axios;
Vue.prototype.$localStorage = localStorage;
Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
