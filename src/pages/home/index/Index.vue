<template>
  <div class="page">
    <h1>首页</h1>
    <div class="banner-wrap">
      <div class="swiper-container">
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(item, index) in swipers" :key="index"><img :src="item.image"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swiper from "../../../assets/js/libs/swiper-3.4.2.min.js";

export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  created(){
    this.handleGetSwiper({success: () => {
      this.$nextTick(() => {
        this.$utils.lazyImg();
        new Swiper(".swiper-container",{
          autoplay: 1000
        })
      })
    }})
  },
  computed: {
    ...mapState({
      swipers: (state) => state.index.swipers
    })
  },
  methods: {
    ...mapActions({
      handleGetSwiper: "index/getSwiper"
    })
  }
};
</script>

<style>
  @import "../../../assets/css/swiper-3.4.2.min.css";
  /* @import "../../../node_modules/swiper/swiper.min.css"; */
  .banner-wrap {width: 100%; height: 3.5rem;}
  .banner-wrap img {width: 100%; height: 100%;}
</style>
