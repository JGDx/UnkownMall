<template>
    <div id="app" v-title data-title="核对信息">
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">查看您的订单</span>
      </nav-bread>
      <div class="container">
        <div class="checkout-order">
          <div class="page-title-normal">
            <h2 class="page-title-h2"><span>核对信息</span></h2>
          </div>
          <!-- process step -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>确认</span>地址</li>
              <li class="cur"><span>查看您的</span>订单</li>
              <li><span>付</span>款</li>
              <li><span>订单</span>确认</li>
            </ul>
          </div>

          <!-- order list -->
          <div class="page-title-normal checkout-title">
            <h2><span>订单内容</span></h2>
          </div>
          <div class="item-list-wrap confirm-item-list-wrap">
            <div class="cart-item order-item">
              <div class="cart-item-head">
                <ul>
                  <li>订单内容</li>
                  <li>价格</li>
                  <li>数量</li>
                  <li>小计</li>
                </ul>
              </div>
              <ul class="cart-item-list">
                <li v-for="item in cartList" v-if="item.checked=='1'">
                  <div class="cart-tab-1">
                    <div class="cart-item-pic">
                      <img :src="/static/+item.productImage" alt="">
                    </div>
                    <div class="cart-item-title">
                      <div class="item-name">{{item.productName | currency('￥')}}</div>
                    </div>
                  </div>
                  <div class="cart-tab-2">
                    <div class="item-price">{{item.salePrice | currency('￥')}}</div>
                  </div>
                  <div class="cart-tab-3">
                    <div class="item-quantity">
                      <div class="select-self">
                        <div class="select-self-area">
                          <span class="select-ipt">×{{item.productNum}}</span>
                        </div>
                      </div>
                      <div class="item-stock item-stock-no">有货</div>
                    </div>
                  </div>
                  <div class="cart-tab-4">
                    <div class="item-price-total">{{item.productNum*item.salePrice | currency('￥')}}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Price count -->
          <div class="price-count-wrap">
            <div class="price-count">
              <ul>
                <li>
                  <span>总金额:</span>
                  <span>{{subTotal | currency('￥')}}</span>
                </li>
                <li>
                  <span>运费:</span>
                  <span>{{shipping | currency('￥')}}</span>
                </li>
                <li>
                  <span>折扣:</span>
                  <span>{{discount | currency('￥')}}</span>
                </li>
                <li>
                  <span>税:</span>
                  <span>{{tax | currency('￥')}}</span>
                </li>
                <li class="order-total-price">
                  <span>合计金额:</span>
                  <span>{{orderTotal | currency('￥')}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="order-foot-wrap">
            <div class="prev-btn-wrap">
              <router-link class="btn btn--m order-btn-red" to="/address">上一步</router-link>
            </div>
            <div class="next-btn-wrap">
              <!--<router-link class="btn btn&#45;&#45;m btn&#45;&#45;red order-btn-red" to="/" @click="payMent">继续付款</router-link>-->
              <button class="btn btn--m btn--red order-btn-red" @click="payMent">继续付款</button>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .order-btn-red{
    font-size:20px !important;
    width:170px;
    height:50px;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
    export default {
        name: "OrderConfirm",
      data(){
          return{
            cartList:[],
            shipping:10,     //运费
            discount:5,     //折扣
            tax:2,           //税
            subTotal:0,
            orderTotal:0
          }
      },
        components:{
          NavHeader,
          NavFooter,
          NavBread
        },
      mounted(){
          this.init();
      },
      methods:{
        init(){
            axios.get("/users/cartList").then((response)=>{
              let res=response.data;
              if(res.status=="0"){
                this.cartList=res.result;
                this.cartList.forEach((item)=>{
                  if(item.checked=='1'){
                    this.subTotal+=item.salePrice*item.productNum;
                    this.orderTotal=this.subTotal+this.shipping-this.discount+this.tax;
                  }
                })
              }else if(res.status=='10001')
              {
                this.$store.commit("updateLoginFlag",true);
              }
            })
          },
        payMent(){
          var addressId=this.$route.query.addressId;
          axios.post('/users/payMent',{
            addressId:addressId,
            orderTotal:this.orderTotal
          }).then((response)=>{
            let res=response.data;
            if(res.status=='0'){
              this.$router.push({
                path:'/pay?orderId='+res.result.orderId
              })
            }else if(res.status=='10001')
            {
              this.$store.commit("updateLoginFlag",true);
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
