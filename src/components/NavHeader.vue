<template>
  <header class="header">
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-arrow-short" viewBox="0 0 25 32">
          <title>arrow-short</title>
          <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
        </symbol>
        <symbol id="icon-status-ok" viewBox="0 0 32 32">
          <title>status-ok</title>
          <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
          <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
        </symbol>
        <symbol id="icon-cart" viewBox="0 0 38 32">
          <title>cart</title>
          <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
          <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
          <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
          <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        </symbol>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path class="path1"
                d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 32 32">
          <title>ok</title>
          <path class="path1"
                d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path class="path1"
                d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path class="path1"
                d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
          <path class="path2"
                d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path3"
                d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path4"
                d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path class="path1" fill="#605f5f"
                d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
          <path class="path2" fill="#605f5f"
                d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="navbar">
      <div class="navbar-left-container">

          <router-link to="/">
            <img class="navbar-brand-logo" src="/static/dao.png">
            <span class="navbar-brand-title">道隐无名商店</span>
          </router-link>


      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <span v-text="nickName" v-if="nickName"></span>
          <a href="javascript:void(0)" class="navbar-link" @click="loginModelFlag=true"  v-if="!nickName">登陆</a>
          <a href="javascript:void(0)" class="navbar-link" @click="logOut"  v-if="nickName">退出</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="cartCount>0">{{cartCount}}</span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="loginModelFlag" @close="loginModelFlag=false">
      <span slot="title">登陆</span>
      <div slot="message">
        <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
        <ul>
          <li class="regi_form_input">
            <i class="icon IconPeople"></i>
            <input placeholder="请输入用户名" type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input">
          </li>
          <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input placeholder="请输入密码"  type="password" tabindex="2" name="password"  v-model="userPwd" class="regi_login_input" @keyup.enter="login">
          </li>
        </ul>
      </div>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn-login" @click="login">登陆</a>
        <div style="height:10px;"></div>
        <a href="javascript:;" class="btn-login"  @click="loginModelFlag=false;regModelFlag=true">注册</a>
      </div>
    </modal>
    <modal v-bind:mdShow="regModelFlag" @close="closeReg">
      <span slot="title">注册</span>
      <div slot="message">
        <span class="error error-show" v-show="errUserRepeat">用户名已存在</span><br>
        <span class="error error-show" v-show="errPwdDifference">两次密码输入不一致</span>
        <ul>
          <li class="regi_form_input">
            <i class="icon IconPeople"></i>
            <input placeholder="请输入用户名" type="text" tabindex="1" name="loginname" v-model="regUserName" class="regi_login_input" v-on:keyup="checkRegUserName">
          </li>
          <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input placeholder="请输入密码"  type="password" tabindex="2" name="password"  v-model="regUserPwd" class="regi_login_input">
          </li>
          <li class="regi_form_input noMargin">
            <i class="icon IconPwd"></i>
            <input placeholder="请再次输入密码"  type="password" tabindex="2" name="password"  v-model="regUserPwd2" class="regi_login_input">
          </li>
        </ul>
      </div>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" v-bind:class="{'btn--dis':regFlag}" @click="regUser">注册</a>
        <a href="javascript:;" class="btn btn--m" @click="closeReg">取消</a>
      </div>
    </modal>
    <modal v-bind:mdShow="loginFlag" v-on:close="closeModal">
      <p slot="message">
        请先登陆！
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="closeModal">关闭</a>
      </div>
    </modal>
  </header>
</template>
<style>
  .error{
    color:red;
  }
  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat",sans-serif;
    font-size: 16px;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }
  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }
  .navbar-brand-logo {
    width: 60px;
    margin-top:20px;
  }
  .navbar-brand-title{
    font-family: "汉仪尚巍手书W";
    font-size:30px;
    position:relative;
    top:-20px;
  }
  .header a, .footer a {
    color: #666;
    text-decoration: none;
  }
  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }
  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }
  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }
  .navbar-link {
    padding-left: 15px;
  }
  .navbar-link:hover{
    color:#ee7a23;
  }
  .navbar-cart-container {
    position: relative;
  }
  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }

</style>
<script>
    import '../assets/css/login.css'
    import axios from 'axios'
    import {mapState} from 'vuex'
    import Modal from '@/components/Modal'
    export default {
        name: "NavHeader",
      data(){
          return{
            userName:'',
            userPwd:'',
            errorTip:false,
            loginModelFlag:false,
            regModelFlag:false,
            errUserRepeat:false,
            regUserName:'',
            regUserPwd:'',
            regUserPwd2:''
          }
      },
      components:{
          Modal
      },
      computed:{
          ...mapState(['nickName','cartCount','loginFlag']),
        errPwdDifference(){
            return !(this.regUserPwd==this.regUserPwd2)
        },
        regFlag(){
            if(this.errPwdDifference||this.errUserRepeat){
              return true;
            }else{
              return false;
            }
        }
          // nickName(){
          //   return this.$store.state.nickName;
          // },
          // cartCount(){
          //   return this.$store.state.cartCount;
          // }
      },
      mounted(){
          this.checkLogin();
      },
      methods:{
          checkLogin(){
            axios.get("/users/checkLogin").then((response)=>{
              let res=response.data;
              if(res.status=="0"){
                // this.nickName=res.result.userName;
                this.$store.commit("updateUserInfo",res.result.userName);
                this.getCartCount();
                if(this.$store.state.nickName=='admin')
                  this.$store.commit("updateAdmin",true);
                else
                  this.$store.commit("updateAdmin",false);
              }
            })
          },
          login(){
            if(!this.userName||!this.userPwd){
              this.errorTip=true;
              return;
            }
            axios.post("/users/login",{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((response)=>{
              let res=response.data;
              if(res.status=="0"){
                this.errorTip=false;
                this.loginModelFlag=false;
                // this.nickName=res.result.userName;
                this.$store.commit("updateUserInfo",res.result.userName);
                this.getCartCount();
                location.reload();
              }else{
                this.errorTip=true;
              }
            })
          },
          logOut(){
            axios.post("/users/logout").then((res)=>{
              let _res=res.data;
              if(_res.status=="0"){
                // this.nickName="";
                this.$store.commit("updateUserInfo","");
                location.reload();
              }
            })
          },
        getCartCount(){
            axios.get("/users/getCartCount").then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                this.$store.commit("initCartCount");
                this.$store.commit("updateCartCount",res.result);
              }
            })
        },
        regUser(){
            if(!this.regFlag)
            {
              axios.post("/users/register",{
                userName:this.regUserName,
                userPwd:this.regUserPwd
              }).then((response)=>{
                let res=response.data;
                if(res.status=='0'){
                  this.userName=this.regUserName;
                  this.userPwd=this.regUserPwd;
                  this.login();
                  this.closeReg();
                }
              })
            }
        },
        closeReg(){
          this.regModelFlag=false;
          this.regUserName='';
          this.regUserPwd='';
          this.regUserPwd2=''
        },
        checkRegUserName(){
            axios.post("/users/checkRegUserName",{
              userName:this.regUserName
            }).then((response)=>{
              let res=response.data;
              if(res.status=='0'){
                this.errUserRepeat=false;
              }else if(res.status=='101'){
                this.errUserRepeat=true;
              }
            })
        },
        closeModal(){
            this.$store.commit("updateLoginFlag",false);
        }
      }
    }
</script>

