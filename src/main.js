// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';

import './assets/css/reset.css';
import './assets/css/style.css';
import VueRouter from 'vue-router';

import Goods from './components/Goods/Goods.vue';
import Ratings from './components/Ratings/Ratings.vue';
import Seller from './components/Seller/Seller.vue';
import AwesomeSwiper from 'vue-awesome-swiper';
import WelcomeSwiper from './components/WelcomeSwiper/WelcomeSwiper.vue';
import Main from './components/Main/Main.vue';



import './assets/css/reset.css';
import './assets/css/style.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(AwesomeSwiper);

Vue.config.productionTip = false;

const router=new VueRouter({
  routes: [
    {path: "/", component: WelcomeSwiper},
    {
      path: '/main', component: Main,
      children: [
        {path: "/goods", component: Goods},
        {path: "/ratings", component: Ratings},
        {path: "/seller", component: Seller},
        {path: "/", redirect: '/goods'}
      ]
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  data:{
    eventHup:new Vue()
  }
})
