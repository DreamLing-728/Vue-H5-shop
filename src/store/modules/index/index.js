import { getSwiperData, getNavData, getGoodsData } from '../../../api/index/index';

export default {
    namespaced: true,
    // 基本对象1：state：变量存储状态
    state: {
        swipers: [],
        navs: [],
        goods: []
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
                console.log('index-res-navs', res);
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
                console.log('index-res-goods', res.data);
                // console.log(' conText, payload',  conText, payload);
                if(res.code === 200) {
                    conText.commit('SET_GOODS', { goods: res.data })
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        }
    }
}