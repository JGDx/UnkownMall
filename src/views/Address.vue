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
            <li>
              <dl>
                <dt>XXX</dt>
                <dd class="address">朝阳公园</dd>
                <dd class="tel">10000000000</dd>
              </dl>
              <div class="addr-opration addr-del">
                <a href="javascript:;" class="addr-del-btn">
                  <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                </a>
              </div>
              <div class="addr-opration addr-set-default">
                <a href="javascript:;" class="addr-set-default-btn"><i>Set default</i></a>
              </div>
              <div class="addr-opration addr-default">Default address</div>
            </li>
            <li class="addr-new">
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
          <a class="addr-more-btn up-down-btn" href="javascript:;">
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
              <div class="name">Standard shipping</div>
              <div class="price">Free</div>
              <div class="shipping-tips">
                <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="next-btn-wrap">
        <a class="btn btn--m btn--red">提交订单</a>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .next-btn-wrap a{
    width:200px;
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
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Modal
      }
    }
</script>

<style scoped>

</style>
