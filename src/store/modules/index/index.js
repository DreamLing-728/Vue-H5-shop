import { getSwiperData, getNavData, getGoodsData, getRecomData, getClassifyData } from '../../../api/index/index';

export default {
    namespaced: true,
    // 基本对象1：state：变量存储状态
    state: {
        swipers: [],
        navs: [],
        goods: [],
        recoms: [],
        classify: []
    },
    // 基本对象2： mutations：修改状态，并且是同步的，在组件中使用$store.commit('',params)
    mutations: {
        ["SET_SWIPER"](state, payload) {
            state.swipers = payload.swipers;
        },
        ["SET_NAV"](state, payload) {
            state.navs = payload.navs;
        },
        ["SET_GOODS"](state, payload) {
            state.goods = payload.goods;
        },
        ["SET_RECOMS"](state, payload) {
            state.recoms = payload.recoms;
        },
        ["SET_CLASSIFY"](state, payload) {
            state.classify = payload.classify;
        }
    },
    // 基本对象3： actions：异步操作，在组件中使用的是$store.dispatch('')
    actions: {
        getSwiper(conText, payload) {
            getSwiperData().then((res) => {
                // console.log('index-res-swipers', res.data);
                // console.log(' conText, payload',  conText.commit, payload);
                if (res.code === 200) {
                    conText.commit('SET_SWIPER', { swipers: res.data });
                    // console.log(' conText, payload', payload);
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getNav(conText, payload) {
            getNavData().then((res) => {
                // console.log('index-res-navs', res);
                // console.log(' conText, payload', conText, payload);
                if (res.code === 200) {
                    conText.commit('SET_NAV', { navs: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getGoods(conText, payload) {
            getGoodsData().then((res) => {
                // console.log('index-res-goods', res.data);
                // console.log(' conText, payload',  conText, payload);
                if (res.code === 200) {
                    conText.commit('SET_GOODS', { goods: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getRecom(conText, payload) {
            getRecomData().then((res) => {
                // console.log('index-res-recom', res.data);
                if (res.code === 200) {
                    conText.commit('SET_RECOMS', { recoms: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getClassify(conText, payload) {
            getClassifyData().then((res) => {
                // console.log('store-classify', res.data);
                if(res.code === 200) {
                    conText.commit('SET_CLASSIFY', {classify: res.data})
                }
            })
        }
    }
}