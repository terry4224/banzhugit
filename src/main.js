
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/flexble.js'
import 'font-awesome/css/font-awesome.min.css'
createApp(App).use(store).use(ElementPlus).use(router).mount('#app');
