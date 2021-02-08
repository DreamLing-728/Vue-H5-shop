import { getSwiperData } from '../../../api/index/index';

export default {
    namespaced: true,
    state: {
        swipers: []
    },
    mutations: {
        ["SET_SWIPER"](state, payload){
            state.swipers = payload.swipers;
        }
    },
    actions: {
        getSwiper(conText, payload){
            getSwiperData().then((res) => {
                console.log('store-index-res', res);
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