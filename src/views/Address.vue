<template>
  <div class="container">
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">地址列表</span>
    </nav-bread>
    <div class="checkout-addr">
      <div class="page-title-normal">
        <h2 class="page-title-h2"><span>核对信息</span></h2>
      </div>
      <!-- process step -->
      <div class="check-step">
        <ul>
          <li class="cur"><span>确认</span>地址</li>
          <li><span>查看您的</span>订单</li>
          <li><span>付</span>款</li>
          <li><span>订单</span>确认</li>
        </ul>
      </div>

      <!-- address list -->
      <div class="page-title-normal checkout-title">
        <h2><span>收件地址</span></h2>
      </div>
      <div class="addr-list-wrap">
        <div class="addr-list">
          <ul>
            <li v-for="(item,index) in addressListFilter" v-bind:class="{'check':selectedAddrId==item.addressId}"  @click="setCheck(item)">
              <dl>
                <dt>{{item.userName}}</dt>
                <dd class="address">{{item.streetName}}</dd>
                <dd class="tel">{{item.tel}}</dd>
              </dl>
              <div class="addr-opration addr-del">
                <a href="javascript:;" class="addr-del-btn" @click="showModal(item.addressId)">
                  <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                </a>
              </div>
              <div class="addr-opration addr-set-default">
                <a href="javascript:;" class="addr-set-default-btn" v-if="!item.isDefault==true" @click="setDefault(item.addressId)"><i>设为默认地址</i></a>
              </div>
              <div class="addr-opration addr-default" v-if="item.isDefault==true">默认地址</div>
            </li>
            <li class="addr-new" @click="showModalAdd">
              <div class="add-new-inner">
                <i class="icon-add">
                  <svg class="icon icon-add"><use xlink:href="#icon-add"></use></svg>
                </i>
                <p>添加新地址</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="shipping-addr-more">
          <a class="addr-more-btn up-down-btn" href="javascript:;" @click="expand" v-bind:class="{'open':pullDown}">
            更多
            <i class="i-up-down">
              <i class="i-up-down-l"></i>
              <i class="i-up-down-r"></i>
            </i>
          </a>
        </div>
      </div>

      <!-- shipping method-->
      <div class="page-title-normal checkout-title">
        <h2><span>寄件方式</span></h2>
      </div>
      <div class="lemall-msg-info hidden">
        <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
      </div>
      <div class="shipping-method-wrap">
        <div class="shipping-method">
          <ul>
            <li class="check">
              <div class="name">快递运输</div>
              <div class="price">￥100</div>
              <div class="shipping-tips">
                <p>发货后，订单会在1-7日内送达收货地址</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="next-btn-wrap">
        <router-link class="btn btn--m btn--red" v-bind:to="{path:'orderConfirm',query:{'addressId':this.selectedAddrId}}">提交订单</router-link>
      </div>
    </div>
    <modal :mdShow="isMdShow" @close="closeModal">
      <p slot="message">
        您是否确认要删除此地址
      </p>
      <div slot="btnGroup">
        <a class="btn--m btn" href="javascript:;" @click="delAddress">确认</a>
        <a class="btn--m btn" href="javascript:;" @click="isMdShow=false">取消</a>
      </div>
    </modal>
    <modal :mdShow="isMdShowIns" @close="closeModal">
      <div slot="message">
        <div class="error-wrap">
        </div>
        <table class="addAddress">
          <tr>
            <td><span class="error" v-show="errorTip">请输入完整信息</span></td>
          </tr>
          <tr>
            <td>收货人：</td>
            <td><input class="regi_form_input" type="text" placeholder="请输入收件人姓名" v-model="addUserName"></td>
          </tr>
          <tr>
            <td>地址：</td>
            <td><input class="regi_form_input" type="text" placeholder="请输入地址" v-model="addStreetName"></td>
          </tr>
          <tr>
            <td>邮编：</td>
            <td><input class="regi_form_input" type="text" placeholder="请输入邮编" v-model="addPostCode"></td>
          </tr>
          <tr>
            <td>联系方式：</td>
            <td><input class="regi_form_input" type="text" placeholder="请输入联系方式" v-model="addTel"></td>
          </tr>
        </table>
      </div>
      <div slot="btnGroup">
        <a class="btn--m btn" href="javascript:;" @click="addAddress">添加</a>
        <a class="btn--m btn" href="javascript:;" @click="closeModal">取消</a>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .next-btn-wrap a{
    width:200px;
  }
  .addAddress{
    margin-left:20px;
    font-size:12px;
  }
  .addAddress tr td{
    width:120px;
    text-align:left;
    line-height:50px;
  }
  .addAddress tr td .regi_form_input{
    height:10px;
  }
  .addAddress tr td .error{
    color:red !important;
    font-size:13px;
  }
</style>
<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import axios from 'axios'
    export default {
        name: "Address",
      data(){
          return{
            addressList:[],
            isMdShow:false,
            isMdShowIns:false,
            delId:'',
            selectedAddrId:'',
            addUserName:'',
            addStreetName:'',
            addPostCode:'',
            addTel:'',
            errorTip:false,
            pullDown:false
          }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Modal
      },
      mounted(){
          this.init();
      },
      computed:{
        addressListFilter(){
          return this.addressList.slice(0,this.limit);
        },
        limit(){
          if(this.pullDown){
            return this.addressList.length;
          }else{
            return 3;
          }
        }
      }
      ,
      methods:{
          init(){
            axios.get("/users/addressList").then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                  this.addressList=res.result;
                  if(this.addressList.addressId)    //如果有地址才可以取第一位id
                    this.selectedAddrId=this.addressList[0].addressId;
              }else if(res.status=='10001')
              {
                this.$store.commit("updateLoginFlag",true);
              }
            })
          },
        expand(){
            // if(this.limit==3){
            //   this.limit=this.addressList.length;
            // }else{
            //   this.limit=3;
            // }
          this.pullDown=!this.pullDown;
        },
        setCheck(item){
            this.selectedAddrId=item.addressId;
        },
        setDefault(addressId){
            axios.post("/users/setDefault",{
              addressId:addressId
            }).then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                this.addressList.forEach((item)=>{
                  if(item.addressId==addressId){
                    item.isDefault=true;
                  }else{
                    item.isDefault=false;
                  }
                })
              }else if(res.status=='10001')
              {
                this.$store.commit("updateLoginFlag",true);
              }
            })
        },
        closeModal(){
            this.isMdShow=false;
            this.isMdShowIns=false
            this.errorTip=false;
            this.addUserName="";
            this.addPostCode="";
            this.addTel="";
            this.addStreetName="";
        },
        showModal(addressId){
            this.isMdShow=true;
            this.delId=addressId;
        },
        delAddress(){
            if(this.delId){
              axios.post('/users/delAddress',{
                addressId:this.delId
              }).then((response)=>{
                let res=response.data;
                if(res.status=='0'){
                  this.closeModal();
                  this.init();
                }else if(res.status=='10001')
                {
                  this.$store.commit("updateLoginFlag",true);
                }
              })
            }
        },
        showModalAdd(){
          this.isMdShowIns=true;
        },
        addAddress(){
            if(this.addUserName&&this.addPostCode&&this.addTel&&this.addStreetName){
              this.errorTip=false;
              axios.post("/users/addAddress",{
                userName:this.addUserName,
                streetName:this.addStreetName,
                postCode:this.addPostCode,
                tel:this.addTel
              }).then((response)=>{
                let res=response.data;
                if(res.status=='0'){
                  this.closeModal();
                  this.init();
                }else if(res.status=='10001')
                {
                  this.$store.commit("updateLoginFlag",true);
                }
              })
            }else{
              this.errorTip=true;
            }
        }
      }
    }
</script>

<style scoped>

</style>
