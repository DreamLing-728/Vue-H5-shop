<template>
  <div class="page-search">
    <!-- 0. 搜索框 -->
    <div class="page-search-top-wrap">
      <div class="back-icon" @click="goBack()">
        <img src="~assets/images/common/back.png" />
      </div>
      <div class="search-wrap">
        <div class="search-icon">
          <img src="~assets/images/common/search_icon.png" />
        </div>
        <el-input v-model="inputSearch" placeholder="请输入宝贝名称"></el-input>
        <!-- <div class="title">请输入宝贝名称</div> -->
      </div>
      <div class="select">分类</div>
    </div>

    <!-- 1. 排序按钮 -->
    <div class="order-wrap">
      <div class="price-wrap" @click="isShowSelect()">
        <div class="price">{{ priceSelect }}</div>
        <div class="select-icon">
          <img src="~assets/images/search/down.png" alt="" />
        </div>
      </div>
      <div class="sale-wrap">销量</div>
    </div>
    <ul class="order-select" v-show="isOrderSelect">
      <li
        v-for="(item, index) in orderSelectList"
        :key="index"
        @click="changeOrderSelect(item)"
      >
        {{ item }}
      </li>
    </ul>
    <div class="mark" v-show="isOrderSelect"></div>

    <!-- 2. 商品搜索结果 -->
    <div class="goods-wrap">
      <div class="item-wrap">
        <div class="img">
          <img src="~assets/images/common/lazyImg.jpg" alt="" />
        </div>
        <div class="content-wrap">
          <div class="title">就流口水的解放路速度快烦了</div>
          <div class="price">￥7823</div>
          <div class="sale">销量199件</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "goods-search",
  data() {
    return {
      inputSearch: "",
      keyword: this.$route.query.keyword ? this.$route.query.keyword : "",
      priceSelect: "综合",
      isOrderSelect: "false",
      orderSelectList: ["综合", "价格从低到高", "价格从高到低"],
    };
  },
  computed: {
    ...mapState({
      attrs: (state) => state.search.attrs,
    }),
  },
  methods: {
    ...mapMutations({
      SET_ATTRS: "search/SET_ATTRS",
    }),
    ...mapActions({
      handleGetAttrs: "search/getAttrs",
    }),
    goBack() {
      this.$router.go(-1);
    },
    changeOrderSelect(priceSelect) {
      // console.log('page-search-changePriceSelect', this);
      this.priceSelect = priceSelect;
      this.isOrderSelect = !this.isOrderSelect;
    },
    isShowSelect() {
      this.isOrderSelect = !this.isOrderSelect;
    },
  },
  created() {
    this.handleGetAttrs({
      keyword: this.keyword,
    });
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
};
</script>

<style lang="scss">
$contentColor: #ffffff;
.page-search {
  background-color: $contentColor;
}
.page-search-top-wrap {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.page-search-top-wrap .back-icon {
  width: 0.6rem;
  height: 0.6rem;
}

.page-search-top-wrap .search-wrap {
  width: 70%;
  height: 1rem;
  display: flex;
  justify-content: left;
  align-items: center;
}

.page-search-top-wrap .search-wrap .search-icon {
  width: 0.6rem;
  height: 0.6rem;
  margin: auto 0.2rem;
}

.page-search-top-wrap .select {
  width: auto;
}

.page-search .order-wrap {
  width: 100%;
  height: 1rem;
  border-bottom: 0.02rem solid #cccccc;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 0.35rem;
}

.page-search .order-wrap .price-wrap {
  width: auto;
  margin: auto 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.page-search .order-wrap .price-wrap .select-icon {
  width: 0.3rem;
  height: 0.3rem;
  margin: auto 0.1rem;
}

.page-search .goods-wrap .item-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2.2rem;
  margin: 0.2rem 0;
}

.page-search .goods-wrap .item-wrap .img {
  width: 25%;
  height: 2.2rem;
}

.page-search .goods-wrap .item-wrap .content-wrap {
  width: 70%;
  height: 100%;
  border-bottom: 0.02rem solid #cccccc;
}

.order-select {
  position: absolute;
  background-color: $contentColor;
  z-index: 10;
  width: 100%;
  padding: 0.2rem;
}

.mark {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.5);
}
</style>