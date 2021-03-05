<template>
  <div class="component-wrap">
    <!-- 1. 搜索框  -->
    <div class="search-wrap">
      <div class="close-icon" @click="closeSearchComponent()">
        <img src="~assets/images/common/search_x.png" alt="" />
      </div>
      <div class="search-wrap">
        <el-input v-model="inputSearch" placeholder="请输入内容"></el-input>
      </div>
      <div class="search-icon" @click="goSearch(inputSearch)">
        <img
          src="~assets/images/common/search_icon.png"
          alt=""
        />
      </div>
    </div>
    <!-- 2. 最近搜索 -->
    <div class="search-show-wrap">
      <div class="top-wrap-search">
        <div class="title-search">最近搜索</div>
        <div class="delete-icon">
          <img src="~assets/images/common/delete.png" alt="" />
        </div>
      </div>
      <div class="item-wrap">
        <div class="item">电脑</div>
        <div class="item">电脑</div>
        <div class="item">电脑</div>
        <div class="item">电脑</div>
        <div class="item">电脑</div>
      </div>
    </div>

    <!-- 3. 热门搜索 -->
    <div class="search-show-wrap">
      <div class="top-wrap-search">
        <div class="title-search">热门搜索</div>
      </div>
      <div class="item-wrap">
        <div class="item" v-for="(item, index) in hotKeywords" :key="index">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "my-search",
  data() {
    return {
      inputSearch: "",
    };
  },
  computed: {
    ...mapState({
      "hotKeywords": (state) => state.search.hotKeywords,
    }),
  },
  methods: {
    ...mapMutations({
      "SET_HOTKEY": "search/SET_HOTKEY",
    }),
    ...mapActions({
      handlegetHotKeywords: "search/getHotKeywords",
    }),

    closeSearchComponent() {
      // console.log('this.$emit')
      this.$emit("close");
    },

    goSearch(inputSearch){
      this.$router.replace('/goods/search?keyword=' + inputSearch);
    }
    
  },
  created() {
    this.handlegetHotKeywords();
  },
  // beforeRouteUpdate(to, from, next) {
  //   // console.log(to, from, next);
  //   document.title = to.meta.title;
  //   this.changeNavStyle(to.name);
  //   next();
  // },
};
</script>

<style>
.component-wrap {
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.component-wrap .search-wrap {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 1rem;
  border-bottom: solid 0.02rem #999999;
}
.component-wrap .search-wrap .close-icon {
  width: 0.6rem;
  height: 0.6rem;
}
.component-wrap .search-wrap .search-icon {
  width: 0.6rem;
  height: 0.6rem;
}

.component-wrap .search-show-wrap {
  position: relative;
  padding: 0.2rem;
  box-sizing: border-box;
  width: 100%;
  height: auto;
}
.component-wrap .search-show-wrap .top-wrap-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.component-wrap .search-show-wrap .top-wrap-search .delete-icon {
  width: 0.6rem;
  height: 0.6rem;
}
.component-wrap .search-show-wrap .item-wrap {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.component-wrap .search-show-wrap .item-wrap .item {
  width: 30%;
  height: 0.5rem;
  background-color: rgba(255, 145, 0, 0.5);
  margin: 0.1rem;
  box-sizing: border-box;
  text-align: center;
  line-height: 0.5rem;
  border-radius: 0.3rem;
}
</style>