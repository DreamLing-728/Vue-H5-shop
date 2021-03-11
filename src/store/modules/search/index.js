import Vue from 'vue';
import { getHotKeywordsData, getAttrsData, getSearchData} from '../../../api/search/index';
import config from '../../../assets/js/config/config';

export default {
    namespaced: true,
    state: {
        hotKeywords: '',
        attrs: [],
        searchData: [],
        total: '',
        param: [],
        price1: '',
        price2: '',
        cid: ''
    },
    
    mutations: {
        // 设置关键字
        ["SET_HOTKEY"](state, payload) {
            state.hotKeywords = payload.hotKeywords;
        },
        // 设置属性的值
        ["SET_PARAM"](state) {
            for(let i = 0; i < state.attrs.length; i ++) {
                for (let j = 0; j < state.attrs.param.length; j ++) {
                    if(state.attrs.param[j].active) {
                        state.param.push(state.attrs.param[j].pid);
                    }
                }
            }
        },
        // 设置最低价
        ["SET_PRICE1"](state, payload) {
            state.price1 = payload.price1;
        },
        // 设置最高价
        ["SET_PRICE2"](state, payload) {
            state.price2 = payload.price2;
        },
        // 设置商品分类的cid
        ["SET_CID"](state, payload) {
            state.cid = payload.cid;
        },
        // 获取属性
        ["GET_ATTRS"](state, payload) {
            state.attrs = payload.attrs;
        },
        ["GET_SEARCH_DATA"](state, payload) {
            state.searchData = payload.searchData;
            state.total = payload.total;
        },
        
    },
    actions: {
        getHotKeywords(conText, payload) {
            getHotKeywordsData().then((res) => {
                // console.log('store-getHotKeywordsData', res);
                if(res.code === 200) {
                    conText.commit("SET_HOTKEY", {hotKeywords: res.data})
                }
            })
        },
        getAttrs(conText, payload) {
            getAttrsData(payload.kwords).then((res) => {
                // console.log('store-getAttrs', res);    // issue 
                // 给结果增加属性：isHide, active
                if(res.code === 200) {
                    for(let i = 0; i < res.data.length; i ++) {
                        // console.log('store-增加isHide属性');
                        res.data[i].isHide = false;
                        for(let j = 0; j < res.data[i].param.length; j ++) {
                            res.data[i].param[j].active = false;
                        }
                    }
                    conText.commit('GET_ATTRS', {attrs: res.data})
                }
                if(payload.success){
                    payload.success();
                }
            })
        },
        getSearch(conText, payload) {
            getSearchData(payload).then((res) => {
                console.log('store-getSearch', res)
                conText.commit('GET_SEARCH_DATA', {searchData: res.data})
                if(payload.success) {
                    payload.success();
                }
            })
        }
    }
}