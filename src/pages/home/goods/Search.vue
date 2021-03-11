<template>
  <div class="page-search">
    <!-- 0. 搜索框 -->
    <div class="page-search-top-wrap">
      <div class="back-icon" @click="goBack()">
        <img src="~assets/images/common/back.png" />
      </div>
      <div class="search-wrap" @click="openSearch()">
        <el-input placeholder="请输入宝贝名称"></el-input>
        <!-- <div class="title">请输入宝贝名称</div> -->
      </div>
      <div class="select" @click="showSelect()">筛选</div>
    </div>

    <!-- 1. 排序按钮 -->
    <div class="order-wrap">
      <div
        :class="{ 'price-wrap': true, active: isPriceOrderSelect }"
        @click="isPriceOrderChange()"
      >
        <div
          class="price"
          v-for="(item, index) in orderSelectListFilter"
          :key="index"
        >
          {{ item.title }}
        </div>
        <div
          :class="isPriceOrder ? 'select-icon up' : 'select-icon down'"
        ></div>
      </div>
      <div
        :class="{ 'sale-wrap': true, active: isSaleOrderSelect }"
        @click="isSaleOrderChange()"
      >
        销量
      </div>
    </div>
    <!-- 下拉列表 -->
    <transition name="slide-fade">
      <div class="order-select-wrap" v-show="isPriceOrder">
        <ul class="order-select">
          <li
            v-for="(item, index) in orderSelectList"
            :key="index"
            @click="changeOrderSelect(item.type)"
          >
            <div :class="item.active ? 'active-li' : 'li'">
              {{ item.title }}
            </div>
          </li>
        </ul>
        <div class="order-mask" @click="isSaleOrderChange()"></div>
      </div>
    </transition>

    <!-- 2. 商品搜索结果 -->
    <div class="goods-wrap">
      <div class="item-wrap" v-for="(item, index) in searchData" :key="index">
        <div class="img">
          <img
            src="~assets/images/common/lazyImg.jpg"
            alt=""
            :data-echo="item.image"
          />
        </div>
        <div class="content-wrap">
          <div class="title">{{ item.title }}</div>
          <div class="price">￥{{ item.price }}</div>
          <div class="sale">销量{{ item.sales }}件</div>
        </div>
      </div>
    </div>

    <!-- 3. 筛选 -->
    <transition name="slide-fade">
      <div class="select-page" v-show="isShowSelect">
        <div class="select-wrap">
          <div class="classify-wrap">
            <div class="title">分类</div>
            <div class="item-wrap">
              <div class="item" v-for="(item, index) in classify" :key="index">
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="price-wrap">
            <div class="title">价格区间</div>
            <div class="item-wrap">
              <div class="item">1-50</div>
              <div class="item">51-100</div>
              <div class="item">101-200</div>
              <div class="item">201-500</div>
            </div>
          </div>
          <div class="action-button-wrap">
            <div id="count" class="item">共5件</div>
            <div id="reset" class="item">全部重置</div>
            <div id="submit" class="item">提交</div>
          </div>
        </div>
        <div class="select-mask" @click="closeSelect()"></div>
      </div>
    </transition>

    <!-- 4. 搜索组件 -->
    <my-search
      v-show="isIntoSearch"
      @close="closeSearch()"
      :isLocal="true"
    ></my-search>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import MySearch from "../../../components/search/search";

export default {
  name: "goods-search",
  data() {
    return {
      kwords: this.$route.query.keyword ? this.$route.query.keyword : "",
      otype: "all",
      isPriceOrder: false, // 下拉选择
      isPriceOrderSelect: true, // 综合排序
      isSaleOrderSelect: false, // 销量排序
      orderSelectList: [
        { type: "all", title: "综合", active: true },
        { type: "up", title: "价格从低到高", active: false },
        { type: "down", title: "价格从高到低", active: false },
      ],
      page: 1,
      isShowSelect: false, // 筛选面板
      isIntoSearch: false, // 搜索组件
    };
  },
  components: {
    MySearch,
  },
  computed: {
    ...mapState({
      attrs: (state) => state.search.attrs,
      searchData: (state) => state.search.searchData,
      param: (state) => state.search.param,
      price1: (state) => state.search.price1,
      price2: (state) => state.search.price2,
      classify: (state) => state.index.classify,
    }),
    // 选择排序方法
    orderSelectListFilter: function () {
      return this.orderSelectList.filter(function (item) {
        return item.active;
      });
    },
  },
  methods: {
    ...mapMutations({
      GET_ATTRS: "search/GET_ATTRS",
      SET_SEARCH_DATA: "search/SET_SEARCH_DATA",
      SET_PARAM: "search/SET_PARAM",
      SET_PRICE1: "search/SET_PRICE1",
      SET_PRICE2: "search/SET_PRICE2",
      SET_CLASSIFY: "index/SET_CLASSIFY",
    }),
    ...mapActions({
      handleGetAttrs: "search/getAttrs",
      handleGetSearch: "search/getSearch",
      handleGetClassify: "index/getClassify",
    }),
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 下拉选择排序类型
    changeOrderSelect(otype) {
      // 左边排序高亮
      this.isPriceOrderSelect = true;
      // 销量排序不高亮
      this.isSaleOrderSelect = false;
      // 收起下拉列表
      this.isPriceOrder = !this.isPriceOrder;
      // 更改对应active为true
      for (let i = 0; i < this.orderSelectList.length; i++) {
        if (this.orderSelectList[i].type === otype) {
          this.orderSelectList[i].active = true;
        } else {
          this.orderSelectList[i].active = false;
        }
      }
      // 更改请求参数
      this.otype = otype;
      // 重新请求
      this.init();
    },
    // 按综合排序
    isPriceOrderChange() {
      this.isPriceOrder = !this.isPriceOrder;
    },
    // 按销量排序
    isSaleOrderChange() {
      if (this.isSaleOrderSelect) {
        this.isSaleOrderSelect = false;
      } else {
        this.isSaleOrderSelect = true;
        this.isPriceOrderSelect = false;
        this.isPriceOrder = false;
        // 修改请求参数
        this.otype = "sales";
        // 重新请求
        this.init();
      }
    },
    // 是否显示筛选页面
    showSelect() {
      this.isShowSelect = true;
    },
    closeSelect() {
      this.isShowSelect = false;
    },
    // 初始化
    init() {
      let jsonParams = {
        kwords: this.kwords,
        param: JSON.stringify(this.param),
        price1: this.price1,
        price2: this.price2,
        otype: this.otype,
        cid: this.cid,
        page: this.page,
      };
      this.handleGetSearch({
        ...jsonParams,
        success: () => {
          this.$nextTick(() => {
            this.$utils.lazyImg();
          });
        },
      });
      this.handleGetClassify();
    },
    // 打开搜索组件
    openSearch() {
      this.isIntoSearch = true;
    },
    // 关闭搜索组件
    closeSearch() {
      this.isIntoSearch = false;
    },
  },
  created() {
    this.handleGetAttrs({
      kwords: this.kwords,
      success: () => {
        this.$nextTick(() => {
          this.$utils.lazyImg();
        });
      },
    });
    this.init();
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('page-search-keyword', to);
    this.kwords = to.query.keyword;
    this.init();
    next();
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

.page-search .order-wrap .price-wrap.active {
  color: #fda208;
}

.page-search .order-wrap .price-wrap .select-icon.down {
  width: 0;
  height: 0;
  border: 0.15rem solid transparent;
  border-top-color: red;
  margin: auto 0.15rem;
}

.page-search .order-wrap .price-wrap .select-icon.up {
  width: 0;
  height: 0;
  border: 0.15rem solid transparent;
  border-bottom-color: red;
  margin: auto 0.2rem;
}

.page-search .order-wrap .sale-wrap.active {
  color: #fda208;
}

.page-search .goods-wrap {
  position: relative;
  z-index: 1;
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

.order-select-wrap {
  position: absolute;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.order-select-wrap .order-select {
  position: absolute;
  z-index: 20;
  width: 100%;
  background-color: $contentColor;
  transition: transform 1s;
  transform: translateY(0%);
  padding: 0.2rem;
}

.order-select-wrap .order-select .active-li {
  color: #fda208;
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(5px);
  opacity: 0;
}

.order-mask {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.3);
}

.select-page {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

// 筛选页面
.select-page .select-wrap {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  background-color: $contentColor;
}

.select-page .select-mask {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.3);
}
.select-fade-enter-active {
  transition: all 0.5s ease;
}
// 筛选
.select-wrap {
  padding: 0.2rem;
  box-sizing: border-box;
}
.select-wrap .title {
  font-size: 0.35rem;
}

.select-wrap .item-wrap {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
}

.select-wrap .item-wrap .item {
  width: 30%;
  height: 0.5rem;
  margin-right: 3%;
  margin-top: 3%;
  text-align: center;
  line-height: 0.5rem;
  background-color: rgba(#bebebe, 0.5);
  border-radius: 1rem;
}

.select-wrap .price-wrap {
  margin-top: 0.5rem;
}

.select-wrap .action-button-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-wrap .action-button-wrap .item {
  width: 33%;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  font-size: 0.4rem;
}

.select-wrap .action-button-wrap #count {
  background-color: #ffffff;
}

.select-wrap .action-button-wrap #reset {
  background-color: #9e9a9a;
}

.select-wrap .action-button-wrap #submit {
  background-color: #fda208;
}
</style>