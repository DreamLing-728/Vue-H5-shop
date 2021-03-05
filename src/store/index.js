import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index';
import search from './modules/search';

Vue.use(Vuex);

let store = new Vuex.Store({
    // 基本对象4：modules：stored的子模块
    modules: {
        index,
        search
    }
});

export default store;