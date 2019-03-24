<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">订单确认</span>
      </nav-bread>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>核对信息</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span>地址</li>
            <li class="cur"><span>查看您的</span>订单</li>
            <li class="cur"><span>付</span>款</li>
            <li class="cur"><span>订单</span>确认</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜! <br>你的订单正在处理中!</h3>
            <p>
              <span>订单号：{{orderId}}</span>
              <span>订单总金额：{{orderTotal | currency('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link to="/cart" class="btn btn--m">购物车列表</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link to="/" class="btn btn--m">商品列表</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import NavHeader from '@/components/NavHeader'
    import NavFooter from '@/components/NavFooter'
    import NavBread from '@/components/NavBread'
    import axios from 'axios'
    export default {
        name: "OrderSuccess",
      data(){
          return{
            orderId:'',
            orderTotal:0
          }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread
      },
      mounted(){
          var orderId=this.$route.query.orderId;
          if(!orderId){
            return;
          }
          var param={
            orderId:orderId
          }
       axios.get("/users/orderDetail",{
         params:param
       }).then((response)=>{
         let res=response.data;
         if(res.status=='0'){
           this.orderTotal=res.result.orderTotal;
           this.orderId=orderId;
         }
       })
      }
    }
</script>

<style scoped>

</style>
