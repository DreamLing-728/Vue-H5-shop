### 1. 生命周期: 钩子函数

```beforeCreate() {
    console.log('beforeCreated');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeRouteUpdate(to, from,  next){
    console.log('beforeRouteUpdate')
    next();
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
```