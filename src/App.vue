<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: "app"
}
</script>

<style lang="scss">
  @import "~assets/css/public.scss"
</style>
