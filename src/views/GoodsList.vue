<template>
    <div id="app" v-title data-title="道隐无名商店">
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">商品</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <div style="float:left">
              <input type="text" class="search" v-model="inputContent" @keyup.enter="search" >
              <a href="javascript:;" class="btn btn--white" @click="search" >搜索</a>
              <select v-model="productType" @change="setProductType(productType)">
                <option value="all" >全部</option>
                <option v-for="item in productTypeList" >{{item}}</option>
              </select>
              <a class="btn--s" v-if="admin" @click="mdAddGoods=true">添加新商品</a>
            </div>
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" @click="sortBy=0;page=1;getGoodsList(false)" class="default" v-bind:class="{'cur':sortBy==0}">默认</a>
            <a href="javascript:void(0)" @click="sortGoods" class="price" v-bind:class="{'cur':sortBy==1}">
              价格
              <!--<svg class="icon icon-arrow-short" v-bind:class="{'sort-up':sortFlag==1}">-->
                <!--<use xlink:href="#icon-arrow-short"></use>-->
              <!--</svg>-->
              <img src="/static/loading-svg/arrow.svg" class="icon icon-arrow-short" v-bind:class="{'sort-up':sortFlag==1&&sortBy==1,'sort-default':sortBy==0}">
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
                  <a href="javascript:void(0)" @click="setPriceFilter(index,price)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice | currency('￥') }} - {{price.endPrice | currency('￥') }}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="goods-del" v-if="admin">
                      <a href="javascript:;" class="addr-del-btn" @click="showDelModal(item.productId)">
                        <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                      </a>
                    </div>
                    <div class="pic">
                      <a href="javascript:;">
                        <img v-if="admin"  v-bind:src="'/static/'+item.productImage" alt="" @click="showUpdateModal(item)">
                        <img v-if="!admin"  v-bind:src="'/static/'+item.productImage" alt="" @click="addCart(item.productId)">
                      </a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice | currency('￥') }}</div>
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
      <modal v-bind:mdShow="mdAddGoods" v-on:close="closeModalAddGoods">
        <span slot="title">添加商品</span>
        <div slot="message" class="addInput">
          <span>上传图片：</span><input type="file" value=""  class="upimg" @change="upLoad" multiple><br>
          <span>商品名称：</span><input type="text" v-model="addProductName"><br>
          <span>价格：</span><input type="text" v-model="addSalePrice">
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="addGoods">添加</a>
          <a href="javascript:;" class="btn btn--m" @click="closeModalAddGoods">取消</a>
        </div>
      </modal>
      <modal v-bind:mdShow="mdDelGoods" v-on:close="closeModalDelGoods">
        <span slot="title">删除商品</span>
        <span slot="message">确认要删除该商品吗？</span>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="delGoods">确认</a>
          <a href="javascript:;" class="btn btn--m" @click="closeModalDelGoods">取消</a>
        </div>
      </modal>
      <modal v-bind:mdShow="mdUpdateGoods" v-on:close="closeModalUpdateGoods">
        <span slot="title">修改商品</span>
        <div slot="message" class="addInput">
          <span>商品名称：</span><input type="text" v-model="updateProductName"><br>
          <span>价格：</span><input type="text" v-model="updateSalePrice">
        </div>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="updateGoods">修改</a>
          <a href="javascript:;" class="btn btn--m" @click="closeModalUpdateGoods">取消</a>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .addInput{
    text-align: left;
    line-height:60px;
  }
  .addInput span{
    display:inline-block;
    width:100px;
  }
  .addInput input{
    height:30px;
  }
  .addInput .error-text{
    margin:0 auto;
  }
  .goods-del{
    float:right;
    padding-right:5px;
    padding-top:5px;
  }
  .goods-del svg{
    width:25px;
    height:25px;
    fill:gray;
  }
  .goods-del svg:hover{
    width:25px;
    height:25px;
    fill: #ee7a23;
  }
  .search{
    height:20px;
  }
  .load-more{
    height:100px;
    line-height:100px;
    text-align: center;
  }
  .sort-up{
    transform:rotate(-180deg);
    transition:all .3s ease-out;
  }
  .sort-default{
    transform:rotate(-90deg);
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
  import {mapState} from 'vuex'
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
          searchContent:'',
          inputContent:'',
          mdShowCart:false,
          mdAddGoods:false,
          mdDelGoods:false,
          mdUpdateGoods:false,
          addProductName:'',
          addSalePrice:0,
          addProductImage:'',
          delProductId:'',
          updateProductName:'',
          updateSalePrice:0,
          updateProductId:'',
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
            },
            {
              startPrice:'2000.00',
              endPrice:'6000.00'
            }
          ],
          priceChecked:'all',
          filterBy:false,
          overLayFlag:false,
          productType:'all',
          productTypeList:[]
       }
      },
      name: "GoodsList",
      computed:{
        ...mapState(['admin']),
      },
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
            if(flag==false){
              this.page=1;
            }
            var param={
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortBy==1?this.sortFlag:0,
              priceGte:this.priceGte,
              priceLt:this.priceLt,
              searchContent:this.searchContent,
              productType:this.productType
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
                for(let item in this.goodsList){
                  if(this.productTypeList.indexOf(this.goodsList[item].productType)==-1){
                    this.productTypeList.push(this.goodsList[item].productType);
                  }
                }
              }else{
                if(res.status=='10001')
                {
                  this.$store.commit("updateLoginFlag",true);
                }
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
          setPriceFilter(index,price){
            this.priceChecked=index;
            this.priceGte=price.startPrice;
            this.priceLt=price.endPrice;
            this.page=1;
            this.closePop();
            this.getGoodsList(false);
            // this.setPriceLevel();

          },
          setPriceAll(){
            this.priceChecked='all';
            this.page=1;
            this.priceLt=0;
            this.priceGte=0;
            this.closePop();
            this.getGoodsList(false);

            // this.setPriceLevel();
          },
          closePop(){
            this.filterBy=false;
            this.overLayFlag=false;
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
                  if(result.status=='10001'){
                    this.$store.commit("updateLoginFlag",true);
                  }
                  this.mdShow=true;
                }
              })
          },
        closeModalCart(){
            this.mdShowCart=false;
        },
        search(){
            this.searchContent=this.inputContent;
            this.page=1;
            this.getGoodsList(false);
        },
        closeModalAddGoods(){
            this.addProductName='';
            this.addSalePrice=0;
            this.addProductImage='';
            this.mdAddGoods=false;
        },
        upLoad(e){
            let photoFile=e.target;
            let val=e.target.value;
            if(photoFile.files.length==0)return false;
            for (let i=0;i<photoFile.files.length;i++){
              this.fileAdd(photoFile.files[i],i);
            }
        },
        fileAdd(file,index){
          let formFile = new FormData();
          let imgName = 'img0';
          formFile.append(imgName, file);
          let name = file.name
          let size = file.size
          let types = '.jpg,.jpeg,.png,.gif'  //文件格式
          let fileExt = name.substring(name.lastIndexOf('.')).toLowerCase()
          let result = types.indexOf(fileExt)
          if (result < 0) {       //验证图片格式
            this.$dialog.toast({
              mes: '图片格式不正确',
              timeout: 1000
            })
            return false
          }
          if (size > 1 * 1024 * 1024) {
            this.$dialog.toast({
              mes: '图片大小不能大于1M',
              timeout: 1000
            })
            return false
          }

          axios.post('/admin/addImage',formFile)
            .then((response) => {
              let res=response.data;
              this.addProductImage=res.result.productImage;
            }).catch((err) => {
            console.log(err);
          })
        },
        addGoods(){
            axios.post('/admin/addGoods',{
              productName:this.addProductName,
              salePrice:this.addSalePrice,
              productImage:this.addProductImage
            }).then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                this.getGoodsList(false);
                this.closeModalAddGoods();
              }else{
                console.log(res.msg);
              }
            })
        },
        showDelModal(id){
            this.delProductId=id;
            this.mdDelGoods=true;
        },
        closeModalDelGoods(){
            this.mdDelGoods=false;
        },
        delGoods(){
            axios.post('/admin/delProduct',{
              productId:this.delProductId
            }).then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                this.closeModalDelGoods();
                this.getGoodsList(false);
              }else{
                console.log(res.msg);
              }
            })
        },
        closeModalUpdateGoods(){
            this.mdUpdateGoods=false;
        },
        updateGoods(){
            axios.post("/admin/updateGoods",{
              productId:this.updateProductId,
              productName:this.updateProductName,
              salePrice:this.updateSalePrice
            }).then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                this.closeModalUpdateGoods();
                this.getGoodsList(false);
              }else{
                console.log(res.msg);
              }
            })
        },
        showUpdateModal(item){
            this.updateProductId=item.productId;
            this.updateProductName=item.productName;
            this.updateSalePrice=item.salePrice;
            this.mdUpdateGoods=true;
        },
        setProductType(item){
            this.productType=item;
            this.getGoodsList(false);
        }
      }
    }

</script>
