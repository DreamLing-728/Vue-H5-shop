<template>
  <div class="page">
    <!-- 1. 轮播图 -->
    <div class="banner-wrap">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in swipers" :key="index">
            <img :src="item.image" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <!-- 2. 分类导航 -->
    <div class="nav-wrap">
      <div class="nav-item" v-for="(item, index) in navs" :key="index">
        <div class="img-wrap">
          <img src="~assets/images/lazyImg.jpg" :data-echo="item.image" :alt="item.title"/>
        </div>
        <div class="title">{{ item.title }}</div>
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
  mounted() {
    this.handleGetSwiper({
      success: () => {
        this.$nextTick(() => {
          this.$utils.lazyImg();
          new Swiper(".swiper-container", {
            autoplay: 2000,
            pagination: ".swiper-pagination",
          });
        });
      },
    });
    this.handleGetNav({
      success: () => {
        this.$nextTick(() => {
          this.$utils.lazyImg();
        });
      },
    });
  },
  computed: {
    ...mapState({
      swipers: (state) => state.index.swipers,
      navs: (state) => state.index.navs,
    }),
  },
  methods: {
    ...mapActions({
      handleGetSwiper: "index/getSwiper",
      handleGetNav: "index/getNav",
    }),
  },
};
</script>

<style lang="scss">
@import "../../../assets/css/swiper-3.4.2.min.css";
/* @import "../../../node_modules/swiper/swiper.min.css"; */

$contentColor: #ffffff;
.banner-wrap {
  width: 100%;
  height: 3.5rem;
}
.banner-wrap img {
  width: 100%;
  height: 100%;
}
.nav-wrap {
  width: 100%;
  height: 1.5rem;
  margin-top: 0.3rem;
  background-color: $contentColor;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav-item {
  width: 1.2rem;
  height: 1.4rem;
}
.nav-item .img-wrap {
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
}
.nav-item .img-wrap img {
  width: 100%;
  height: 100%;
}
</style>
