<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">商品</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" @click="sortBy=0" class="default" v-bind:class="{'cur':sortBy==0}">默认</a>
            <a href="javascript:void(0)" @click="sortGoods" class="price" v-bind:class="{'cur':sortBy==1}">
              价格
              <!--<svg class="icon icon-arrow-short" v-bind:class="{'sort-up':sortFlag==1}">-->
                <!--<use xlink:href="#icon-arrow-short"></use>-->
              <!--</svg>-->
              <img src="/static/loading-svg/arrow.svg" class="icon icon-arrow-short" v-bind:class="{'sort-up':sortFlag==-1}">
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">过滤</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>价格:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceAll">全部</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img  v-bind:src="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">￥{{item.salePrice }}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading" >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">
          请先登陆，否则无法加入到购物车中！
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="closeModal">关闭</a>
        </div>
      </modal>
      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModalCart">
        <p slot="message">
          <svg style="width:50px;height:50px;margin-right:20px;">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功!!</span>
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="closeModalCart">继续购物</a>
          <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .load-more{
    height:100px;
    line-height:100px;
    text-align: center;
  }
  .sort-up{
    transform:rotate(180deg);
    transition:all .3s ease-out;
  }
  .icon-arrow-short{
    transition:all .3s ease-out;
  }
  .btn:hover{
    background-color:#FFE5E6;
    transition:all .3s ease-out;
  }
</style>
<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import axios from 'axios'
    export default {
      data(){
        return{
          goodsList:[],
          sortFlag:1,
          page:1,
          pageSize:8,
          sortBy:0,
          busy:true,
          priceGte:0,
          priceLt:0,
          loading:false,
          mdShow:false,
          mdShowCart:false,
          priceFilter:[
            {
              startPrice:'0.00',
              endPrice:'500.00'
            },
            {
              startPrice:'500.00',
              endPrice:'1000.00'
            },
            {
              startPrice:'1000.00',
              endPrice:'2000.00'
            }
          ],
          priceChecked:'all',
          filterBy:false,
          overLayFlag:false
       }
      },
      name: "GoodsList",
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Modal
      },
      mounted:function(){
          this.getGoodsList();
      },
      methods:{
          getGoodsList(flag){
            var param={
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag,
              priceGte:this.priceGte,
              priceLt:this.priceLt
            };
            this.loading=true;
            axios.get("/goods/list",{
              params:param
            }).then((result)=>{
              this.loading=false;
              var res=result.data;
              if(res.status=="0"){
                if(flag){
                  this.goodsList=this.goodsList.concat(res.result.list);
                  if(res.result.count==0){
                    this.busy=true;
                  }else{
                    this.busy=false;
                  }
                }else{
                  this.goodsList=res.result.list;
                  this.busy=false;
                }
              }else{
                this.goodsList=[];
              }
            })
          },
          loadMore(){
            setTimeout(() => {
              this.page++;
              this.getGoodsList(true);
            }, 1000);
          },
          sortGoods(){
            this.sortFlag=this.sortFlag*-1;
            this.page=1;
            this.sortBy=1;
            this.getGoodsList();
          },
          showFilterPop(){
            this.filterBy=true;
            this.overLayFlag=true;
          },
          setPriceFilter(index){
            this.priceChecked=index;
            this.setPriceLevel();
            this.closePop();
          },
          setPriceAll(){
            this.priceChecked='all';
            this.setPriceLevel();
          },
          closePop(){
            this.filterBy=false;
            this.overLayFlag=false;
          },
          setPriceLevel(){
            this.page=1;
            switch(this.priceChecked){
              case 'all':
                this.priceGte=0;
                this.priceLt=0;
                break;
              case 0:
                this.priceGte=0;
                this.priceLt=500;
                break;
              case 1:
                this.priceGte=500;
                this.priceLt=1000;
                break;
              case 2:
                this.priceGte=1000;
                this.priceLt=2000;
                break;
            }
            this.getGoodsList(false);
          },
          addCart(productId){
              axios.post('/goods/addCart',{
                productId:productId
              }).then((res)=>{
                var result=res.data;
                if(result.status=="0"){
                  this.$store.commit("updateCartCount",1);
                  this.mdShowCart=true;
                }else{
                  this.mdShow=true;
                }
              })
          },
        closeModal(){
            this.mdShow=false;
        },
        closeModalCart(){
            this.mdShowCart=false;
        }
      }
    }

</script>
