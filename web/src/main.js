import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Index from './views/index'
import Login from './views/login'

Vue.config.productionTip = false;

const routes = [
  {path: '/', component: Index},
  {path:'/login',component:Login},
  {path: '/article/:oid', component: () => import(/* webpackChunkName: "article" */ './views/article.vue'),props: true},
  {path: '/mdeditor/:oid', component: () => import(/* webpackChunkName: "editor" */ './views/mdeditor.vue'),props: true}

];
const router = new VueRouter({
  mode:'history',
  routes:routes
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


