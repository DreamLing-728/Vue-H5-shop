<template>
  <div class="page">
    <h1>搜索结果页</h1>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "goods-search",
  data() {
    return {
      keyword: this.$route.query.keyword ? this.$route.query.keyword : "",
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
  },
  created() {
    this.handleGetAttrs({
      keyword: this.keyword,
    });
  },
  mounted() {
    document.title = this.$route.meta.title;
  }
  
};
</script>

<style>
</style>
