<template>
  <div class="page">
    <!-- 0. 搜索框 -->
    <div class="top-wrap">
      <div class="classify-icon"><img src="~assets/images/class.png" /></div>
      <div class="search-wrap" @click="openSearchComponent()">
        <div class="search-icon"><img src="~assets/images/search.png" /></div>
        <div class="title">请输入宝贝名称</div>
      </div>
      <div class="login"><div class="title">登录</div></div>
    </div>

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
    <div class="classify-wrap" v-for="(item, index) in goods" :key="index">
      <div class="classify-item0-wrap" v-if="index % 2 === 0">
        <div class="classify-title">——{{ item.title }}——</div>
        <div class="above-wrap">
          <div class="left-wrap">
            <div class="title">{{ item.items[0].title }}</div>
            <div class="remark-price">
              <div class="remark">精品打折</div>
              <div class="price">{{ item.items[0].price }}</div>
            </div>
            <div class="img-wrap">
              <img
                src="~assets/images/lazyImg.png"
                :data-echo="item.items[0].image"
              />
            </div>
          </div>
          <div class="right-wrap">
            <div
              class="item-wrap"
              v-for="(item2, index2) in item.items.slice(1, 3)"
              :key="index2"
            >
              <div class="title-remark">
                <div class="title">{{ item2.title }}</div>
                <div class="remark">精品挑选</div>
              </div>
              <div class="img-wrap">
                <img
                  src="~assets/images/lazyImg.png"
                  :data-echo="item2.image"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="below-wrap">
          <div
            class="item-wrap"
            v-for="(item3, index3) in item.items.slice(3)"
            :key="index3"
          >
            <div class="title">{{ item3.title }}</div>
            <div class="img-wrap">
              <img src="~assets/images/lazyImg.png" :data-echo="item3.image" />
            </div>
            <div class="now-price">￥{{ item3.price }}</div>
            <div class="old-price">￥{{ item3.price * 2 }}</div>
          </div>
        </div>
      </div>
      <div class="classify-item1-wrap" v-else>
        <div class="classify-title">———{{ item.title }}———</div>
        <div class="above-wrap">
          <div
            class="item-wrap"
            v-for="(item1, index1) in item.items.slice(0, 2)"
            :key="index1"
          >
            <div class="title">{{ item1.title }}</div>
            <div class="remark">精品挑选</div>
            <div class="img-wrap">
              <img src="~assets/images/lazyImg.png" :data-echo="item1.image" />
            </div>
          </div>
        </div>
        <div class="below-wrap">
          <div
            class="item-wrap"
            v-for="(item2, index2) in item.items.slice(2)"
            :key="index2"
          >
            <div class="title">{{ item2.title }}</div>
            <div class="img-wrap">
              <img src="~assets/images/lazyImg.png" :data-echo="item2.image" />
            </div>
            <div class="now-price">￥{{ item2.price }}</div>
            <div class="old-price">￥{{ item2.price * 2 }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 推荐 -->
    <div class="recom-wrap">
      <div class="title-wrap">
        <div class="line"></div>
        <div class="title">为您推荐</div>
        <div class="line"></div>
      </div>
      <div class="content-wrap">
        <div class="item-wrap" v-for="(item, index) in recoms" :key="index">
          <div class="img-wrap">
            <img src="~assets/images/lazyImg.png" :data-echo="item.image" />
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="price">￥{{ item.price }}</div>
        </div>
      </div>
    </div>

    <my-search v-show="searchShow" @close="closeSearchComponent()"></my-search>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swiper from "../../../assets/js/libs/swiper-3.4.2.min.js";
import MySearch from "../../../components/search/search";

export default {
  name: "index",
  components: {
    MySearch,
  },
  data() {
    return {
      searchShow: false
    };
  },
  created() {
    // console.log("created");
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
    this.handleGetGoods({
      success: () => {
        this.$nextTick(() => {
          this.$utils.lazyImg();
        });
      },
    });
    this.handleGetRecoms({
      success: () => {
        this.$nextTick(() => {
          this.$utils.lazyImg();
          this.watchVuexData();
        });
      },
    });
  },
  mounted() {

  },
  computed: {
    ...mapState({
      swipers: (state) => state.index.swipers,
      navs: (state) => state.index.navs,
      goods: (state) => state.index.goods,
      recoms: (state) => state.index.recoms,
    }),
  },
  methods: {
    ...mapActions({
      handleGetSwiper: "index/getSwiper",
      handleGetNav: "index/getNav",
      handleGetGoods: "index/getGoods",
      handleGetRecoms: "index/getRecom",
    }),
    // 监控数据
    watchVuexData() {
      // console.log("getVuexData", this.recoms);
    },
    // 显示搜索组件
    openSearchComponent() {
      this.searchShow = true;
    },
    // 关闭搜索组件
    closeSearchComponent() {
      // console.log('index-get-this.$emit');
      this.searchShow = false
    }
  },
  // beforeCreate() {
  // console.log("beforeCreated");
  // },
  // created() {
  //   console.log('created');
  // },
  // beforeMount() {
  // console.log("beforeMount");
  // },
  // mounted() {
  //   console.log("mounted-recoms", this.recoms);
  // },
 
 
  // beforeUpdate() {
  // console.log("beforeUpdate");
  // },
  // updated() {
  // console.log("updated");
  // },
};
</script>

<style lang="scss">
@import "../../../assets/css/swiper-3.4.2.min.css";

$contentColor: #ffffff;
$classifyFontSize: 0.35rem;
$classifyItemFontSize: 0.3rem;

.page {
  margin-bottom: 1.5rem;
}

.top-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 0.8rem;
  margin: 0 auto;
}
.top-wrap .title {
  color: $contentColor;
  font-size: 0.33rem;
  line-height: 0.8rem;
}
.top-wrap .classify-icon {
  width: 0.7rem;
  height: 0.7rem;
  margin-left: 0.2rem;
}
.top-wrap .search-wrap {
  width: 70%;
  height: 80%;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.3rem;
}
.top-wrap .search-wrap .search-icon {
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.3rem;
}
.top-wrap .login {
  margin-right: 0.2rem;
}

.banner-wrap {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 3.5rem;
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

.classify-wrap {
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
}
.classify-wrap .title {
  height: 0.5rem;
  font-weight: 600;
  font-size: $classifyItemFontSize;
  // 文字只显示1行，超出用...代替
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.classify-wrap img {
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
.classify-wrap .below-wrap .item-wrap {
  width: 25%;
}
.classify-wrap .below-wrap .img-wrap {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 auto;
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

.classify-wrap .classify-item0-wrap,
.classify-item1-wrap {
  background-color: $contentColor;
  padding: 0.1rem;
  box-sizing: border-box;
  margin-top: 0.2rem;
}
.classify-wrap .classify-item0-wrap .classify-title {
  text-align: center;
  color: #ee0909;
  font-size: $classifyFontSize;
  margin-top: 0.2rem;
}
.classify-wrap .classify-item0-wrap .above-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin-top: 0.2rem;
}
.classify-wrap .classify-item0-wrap .above-wrap .left-wrap {
  width: 48%;
  border-right: 0.02rem solid #cccccc;
}
.classify-wrap .classify-item0-wrap .above-wrap .left-wrap .remark-price {
  width: 70%;
  height: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ee0909;
}
.classify-wrap .classify-item0-wrap .above-wrap .left-wrap .img-wrap {
  width: 90%;
  height: 2rem;
}
.classify-wrap .classify-item0-wrap .above-wrap .right-wrap {
  width: 48%;
  height: 100%;
  margin-left: 0.2rem;
}
.classify-wrap .classify-item0-wrap .above-wrap .right-wrap .item-wrap {
  display: flex;
  justify-items: center;
  align-items: space-around;
  height: 50%;
  border-bottom: 0.02rem solid #cccccc;
}
.classify-wrap
  .classify-item0-wrap
  .above-wrap
  .right-wrap
  .item-wrap
  .title-remark {
  width: 65%;
}
.classify-wrap
  .classify-item0-wrap
  .above-wrap
  .right-wrap
  .item-wrap
  .img-wrap {
  width: 35%;
  height: 100%;
}

.classify-wrap .classify-item1-wrap .classify-title {
  text-align: center;
  color: #087027;
  font-size: $classifyFontSize;
  margin-top: 0.2rem;
}
.classify-wrap .classify-item1-wrap .above-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  margin-top: 0.2rem;
}
.classify-wrap .classify-item1-wrap .above-wrap .item-wrap {
  width: 50%;
  height: 100%;
}
.classify-wrap .classify-item1-wrap .above-wrap .item-wrap .img-wrap {
  margin: 0 auto;
  width: 1.5rem;
  height: 2rem;
}

.recom-wrap {
  margin-top: 0.2rem;
}
.recom-wrap .title {
  width: 100%;
  font-weight: 600;
  font-size: $classifyItemFontSize;
  // 文字只显示2行，超出用...代替
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.recom-wrap .price {
  color: #ee0909;
}
.recom-wrap .title-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: $classifyFontSize;
}
.recom-wrap .title-wrap .line {
  width: 35%;
  height: 0.02rem;
  background-color: #b1adad;
}
.recom-wrap .content-wrap {
  width: 96%;
  height: auto;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.recom-wrap .content-wrap .item-wrap {
  width: 48%;
  height: 4rem;
  background-color: $contentColor;
}
.recom-wrap .content-wrap .item-wrap .img-wrap {
  width: 90%;
  height: 2.5rem;
}
</style>
