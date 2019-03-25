// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from '@/util/currency'
import Vuex from 'vuex'
Vue.use(VueLazyLoad,{
  loading:"/static/loading-svg/loading-bars.svg"
})
Vue.use(Vuex)
Vue.use(infiniteScroll)

Vue.config.productionTip = false

Vue.filter("currency",currency);

const store=new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickname){
      state.nickName=nickname;
    },
    updateCartCount(state,cartCount){
      state.cartCount=state.cartCount+cartCount;
    },
    initCartCount(state){
      state.cartCount=0;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
  // render:function(h){
  //   return h(App);
  // }
})
  // .$mount("#app")
