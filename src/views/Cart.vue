<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">我的购物车</span>
    </nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>我的购物车</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>全部商品</li>
                <li>单价</li>
                <li>数量</li>
                <li>小计</li>
                <li>操作</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" v-bind:class="{'check':item.checked=='1'}" @click="editCart('checked',item)">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-bind:src="/static/+item.productImage" v-bind:alt="item.productName">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">￥{{item.salePrice}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a href="javascript:;" class="input-sub">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a href="javascript:;" class="input-add">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">￥100</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item.productId)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;">
                  <span class="checkbox-btn item-check-btn">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>全选</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                总价: <span class="total-price">￥500</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red">结算</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-bind:mdShow="modalConfirm" @close="closeModal">
      <p slot="message">你确定要删除此条数据吗？</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delCart">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="modalConfirm=false">关闭</a>
      </div>
    </Modal>
    <nav-footer></nav-footer>
  </div>
</template>

<style>
  .btn--red{
    width:100px;
    font-size:20px;
    padding-left:15px;
  }
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>

<script>
  import './../assets/css/checkout.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import axios from 'axios'
    export default {
        data(){
          return{
            cartList:[],
            modalConfirm:false,
            productId:''
          }
        },
        name: "Cart",
        components:{
          NavHeader,
          NavFooter,
          NavBread,
          Modal
        },
        mounted(){
          this.init();
        },
        methods:{
            init(){
              axios.get('users/cartList').then((response)=>{
                let res=response.data;
                if(res.status=='0'){
                  this.cartList=res.result;
                }
              });
            },
          delCartConfirm(productId){
              this.productId=productId;
              this.modalConfirm=true;
          },
          delCart(){
              axios.post('/users/cartDel',{
                productId:this.productId
              }).then((response)=>{
                let res=response.data;
                if(res.status=='0'){
                  this.modalConfirm=false;
                  this.init();
                }
              });
          },
          closeModal(){
              this.modalConfirm=false;
          }
        }
    }
</script>

