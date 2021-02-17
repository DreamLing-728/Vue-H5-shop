import { getSwiperData, getNavData } from '../../../api/index/index';

export default {
    namespaced: true,
    // 基本对象1：state：变量存储状态
    state: {
        swipers: [],
        navs: []
    },
    // 基本对象2： mutations：修改状态，并且是同步的，在组件中使用$store.commit('',params)
    mutations: {
        ["SET_SWIPER"](state, payload){
            state.swipers = payload.swipers;
        },
        ["SET_NAV"](state, payload){
            state.navs = payload.navs;
        }
    },
    // 基本对象3： actions：异步操作，在组件中使用的是$store.dispatch('')
    actions: {
        getSwiper(conText, payload){
            getSwiperData().then((res) => {
                console.log('index-res-swipers', res.data);
                // console.log(' conText, payload',  conText.commit, payload);
                if(res.code === 200){
                    conText.commit('SET_SWIPER', {swipers: res.data});
                    // console.log(' conText, payload', payload);
                    if(payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getNav(context, payload){
            getNavData().then((res) => {
                console.log('index-res-navs', res.data);
                console.log(' conText, payload', context, payload);
                if(res.code === 200){
                    context.commit('SET_NAV', {navs: res.data});
                    if(payload.success){
                        payload.success();
                    }
                }
            })
        }
    }
}