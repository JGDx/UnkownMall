<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <router-link to="/">主页</router-link>
        <!--<span>Goods</span>-->
        <slot name="bread"></slot>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NavBread"
    }
</script>
