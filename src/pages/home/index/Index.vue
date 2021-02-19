<template>
  <div class="page">
    <!-- 1. 轮播图 -->
    <div class="banner-wrap">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in swipers"
            :key="index"
          >
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
          <img
            src="~assets/images/lazyImg.png"
            :data-echo="item.image"
            :alt="item.title"
          />
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>

    <!-- 3. 分类展示 -->
    <div class="classify-wrap">
      <div class="classify-title">——潮流女装——</div>
      <div class="above-wrap">
        <div class="left-wrap">
          <div class="title">高跟鞋2020新款春季单鞋好看好看</div>
          <div class="remark-price">
            <div class="remark">精品打折</div>
            <div class="price">12.8</div>
          </div>
          <div class="img-wrap"><img src="~assets/images/lazyImg.png" /></div>
        </div>
        <div class="right-wrap">
          <div class="item-wrap">
            <div class="title-remark">
              <div class="title">欧美尖头蝴蝶结高跟鞋</div>
              <div class="remark">精品挑选</div>
            </div>
            <div class="img-wrap"><img src="~assets/images/lazyImg.png" /></div>
          </div>
          <div class="item-wrap">
            <div class="title-remark">
              <div class="title">欧美尖头蝴蝶结高跟鞋</div>
              <div class="remark">精品挑选</div>
            </div>
            <div class="img-wrap"><img src="~assets/images/lazyImg.png" /></div>
          </div>
        </div>
      </div>
      <div class="below-wrap">
        <div class="item">
          <div class="title">2021年新款</div>
          <div class="img-wrap"><img src="~assets/images/lazyImg.png"></div>
          <div class="now-price">￥288</div>
          <div class="old-price">￥398</div>
        </div>
        <div class="item">
          <div class="title">2021年新款</div>
          <div class="img-wrap"><img src="~assets/images/lazyImg.png"></div>
          <div class="now-price">￥288</div>
          <div class="old-price">￥398</div>
        </div>
        <div class="item">
          <div class="title">2021年新款</div>
          <div class="img-wrap"><img src="~assets/images/lazyImg.png"></div>
          <div class="now-price">￥288</div>
          <div class="old-price">￥398</div>
        </div>
        <div class="item">
          <div class="title">2021年新款</div>
          <div class="img-wrap"><img src="~assets/images/lazyImg.png"></div>
          <div class="now-price">￥288</div>
          <div class="old-price">￥398</div>
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
$classifyFontSize: 0.35rem;
$classifyItemFontSize: 0.3rem;
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
  margin-top: 0.25rem;
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

.classify-wrap {
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;
  background-color: $contentColor;
}
.classify-wrap .classify-title {
  text-align: center;
  color: #ee0909;
  font-size: $classifyFontSize;
}
.classify-wrap .above-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin-top: 0.2rem;
}
.classify-wrap .above-wrap .left-wrap {
  width: 50%;
  border-right: 0.02rem solid #cccccc;
}
.classify-wrap .above-wrap .left-wrap .title {
  height: 0.5rem;
  font-weight: 600;
  font-size: $classifyItemFontSize;
  // 文字只显示1行，超出用...代替
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.classify-wrap .above-wrap .left-wrap .remark-price {
  width: 70%;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ee0909;
}

.classify-wrap .above-wrap .left-wrap .img-wrap {
  width: 90%;
  height: 2rem;
}

.classify-wrap .above-wrap .left-wrap .img-wrap img {
  width: 100%;
  height: 100%;
}

.classify-wrap .above-wrap .right-wrap {
  width: 50%;
  height: 100%;
  margin-left: 0.2rem;
}
.classify-wrap .above-wrap .right-wrap .item-wrap {
  display: flex;
  justify-items: center;
  align-items: space-around;
  height: 50%;
  border-bottom: 0.02rem solid #cccccc;
}
.classify-wrap .above-wrap .right-wrap .item-wrap .title-remark {
  width: 65%;
}
.classify-wrap .above-wrap .right-wrap .item-wrap .title-remark .title {
  height: 0.5rem;
  font-weight: 600;
  font-size: $classifyItemFontSize;
  // 文字只显示1行，超出用...代替
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.classify-wrap .above-wrap .right-wrap .item-wrap .img-wrap {
  width: 35%;
  height: 100%;
}
.classify-wrap .above-wrap .right-wrap .item-wrap .img-wrap img {
  width: 100%;
  height: 100%;
}
.classify-wrap .below-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  border-top: 0.02rem solid #cccccc;
  padding-top: 0.2rem;
}
.classify-wrap .below-wrap .item .title {
  font-weight: 600;
  font-size: $classifyItemFontSize;
  // 文字只显示1行，超出用...代替
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.classify-wrap .below-wrap .img-wrap {
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
}
.classify-wrap .below-wrap .img-wrap img {
  width: 100%;
  height: 100%;
}
.classify-wrap .below-wrap .now-price {
  color: #ee0909;
  text-align: center;
  font-size: 0.3rem;
}
.classify-wrap .below-wrap .old-price {
  color: #999999;
  text-align: center;
  text-decoration: line-through;
}
</style>
