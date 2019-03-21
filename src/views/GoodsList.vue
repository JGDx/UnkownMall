<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" @click="sortBy=0" class="default" v-bind:class="{'cur':sortBy==0}">Default</a>
            <a href="javascript:void(0)" @click="sortGoods" class="price" v-bind:class="{'cur':sortBy==1}">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="setPriceAll">All</a></dd>
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
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
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
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .load-more{
    height:100px;
    line-height:100px;
    text-align: center;
  }
</style>
<script>
  import '@/assets/css/base.css'
  import '@/assets/css/product.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'
    export default {
      data(){
        return{
          goodsList:[],
          sortFlag:true,
          page:1,
          pageSize:8,
          sortBy:0,
          busy:true,
          priceGte:0,
          priceLt:0,
          loading:false,
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
        NavBread
      },
      mounted:function(){
          this.getGoodsList();
      },
      methods:{
          getGoodsList(flag){
            var param={
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1,
              priceGte:this.priceGte,
              priceLt:this.priceLt
            };
            this.loading=true;
            axios.get("/goods",{
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
            this.sortFlag=!this.sortFlag;
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
          }
      }
    }

</script>
