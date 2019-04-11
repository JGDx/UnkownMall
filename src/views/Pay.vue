<template>
    <div id="app" v-title data-title="付款">
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">付款</span>
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
            <li><span>订单</span>确认</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="pay-pic"><img src="static/pay.png" alt=""></div>
          <div class="order-create-main">
            <button class="btn btn--s pay" @click="pay">付款</button>
          </div>

        </div>

      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .pay-pic img{
    width:200px;
  }
  .order-create-main{
    margin-top:60px;
  }
  .pay{
    width:180px;
    height:40px;
  }
</style>
<script>
    import NavHeader from '@/components/NavHeader'
    import NavBread from "../components/NavBread";
    import NavFooter from "../components/NavFooter";
    export default {
        name: "Pay",
      components: {NavFooter, NavBread, NavHeader},
      methods:{
          pay(){
            if(!this.$route.query.orderId)
              return;
            this.$router.push({
              path:"/ordersuccess?orderId="+this.$route.query.orderId
            });
          }
      }
    }
</script>

