import { getSwiperData } from '../../../api/index/index';

export default {
    namespaced: true,
    // 基本对象1：state：变量存储状态
    state: {
        swipers: []
    },
    // 基本对象2： mutations：修改状态，并且是同步的，在组件中使用$store.commit('',params)
    mutations: {
        ["SET_SWIPER"](state, payload){
            state.swipers = payload.swipers;
        }
    },
    // 基本对象3： actions：异步操作，在组件中使用的是$store.dispatch('')
    actions: {
        getSwiper(conText, payload){
            getSwiperData().then((res) => {
                console.log('store-index-res', res.data);
                // console.log(' conText, payload',  conText.commit, payload);
                if(res.code === 200){
                    conText.commit('SET_SWIPER', {swipers: res.data});
                    // console.log(' conText, payload', payload);
                    if(payload.success) {
                        payload.success();
                    }
                }
            })
        }
    }
}