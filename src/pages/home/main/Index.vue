<template>
  <div class="page">
    <router-view></router-view>
    <div class="nav">
      <div :class="{index: true, active: indexStyle}" @click="pageReplace('/index')">
        <div class="imagehome"></div>
        <div class="title">首页</div>
      </div>

      <div :class="{cart: true, active: cartStyle}" @click="pageReplace('/cart')">
        <div class="imagehome"></div>
        <div class="title">购物车</div>
      </div>

      <div :class="{my: true, active: myStyle}" @click="pageReplace('/my')">
        <div class="imagehome"></div>
        <div class="title">我的</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      indexStyle: "",
      cartStyle: "",
      myStyle: "",
    };
  },
  methods: {
    pageReplace(url) {
      this.$router.replace(url);
    },
    changeNavStyle(name) {
      switch(name) {
        case "index":
          this.indexStyle = true;
          this.cartStyle = false;
          this.myStyle = false;
          break;
        case "cart":
          this.indexStyle = false;
          this.cartStyle = true;
          this.myStyle = false;
          break;
        case "my":
          this.indexStyle = false;
          this.cartStyle = false;
          this.myStyle = true;
          break;
        default:
          this.indexStyle = true;
          this.cartStyle = false;
          this.myStyle = false;
          break;
      }
    }
  },

  created() {
    this.changeNavStyle(this.$route.name)
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to, from, next);
    document.title = to.meta.title;
    this.changeNavStyle(to.name);
    next();
  },
};
</script>

<style lang="scss">
$colorRed: #d10c0c;
$sizeImage: 0.8rem;

.nav { position: fixed; bottom: 0; display: flex; justify-content: space-around; align-items: center; width: 100%; font-size: 0.35rem;}

.nav .index {width: 1rem;}
.nav .index.active {color: $colorRed}
.nav .index .imagehome {width: $sizeImage; height: $sizeImage; margin: 0 auto; background-image: url("~assets/images/home1.png"); background-size: 100%; background-position: center; }
.nav .index.active .imagehome {width: $sizeImage; height: $sizeImage; background-image: url("~assets/images/home2.png"); background-size: 100%;}

.nav .cart.active {color: $colorRed}
.nav .cart .imagehome {width: $sizeImage; height: $sizeImage; margin: 0 auto; background-image: url("~assets/images/cart1.png"); background-size: 100%; background-position: center;}
.nav .cart.active .imagehome {width: $sizeImage; height: $sizeImage; margin: 0 auto; background-image: url("~assets/images/cart2.png"); background-size: 100%;}

.nav .my.active {color: $colorRed}
.nav .my .imagehome {width: $sizeImage; height: $sizeImage; background-image: url("~assets/images/my1.png"); background-size: 100%; background-position: center;}
.nav .my.active .imagehome {width: $sizeImage; height: $sizeImage; background-image: url("~assets/images/my2.png"); background-size: 100%;}
</style>
