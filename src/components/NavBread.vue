<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">主页</a>
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
