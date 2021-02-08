<template>
  <div class="page">
    <h1>首页</h1>
    <div v-for="(item, index) in swipers" :key="index">{{item.title}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "index",
  components: {},
  data() {
    return {};
  },
  created(){
    this.getSwiper({success: () => {
      this.$nextTick(() => {
        this.$utils.lazyImg();
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
      getSwiper: "index/getSwiper"
    })
  },
  mounted() {
    console.log(this.swipers);
  },
};
</script>
