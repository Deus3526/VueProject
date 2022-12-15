import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Loading from 'vue3-loading-overlay';
// import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import mitt from 'mitt' 
const emitter = mitt()
const app=createApp(App);
app.config.globalProperties.$emitter = emitter //註冊為app的全域變數 //之後透過this.$emitter進行呼叫
app.use(router);
app.use(VueAxios, axios);
//app.component('Loading',Loading);
app.mount("#app");
