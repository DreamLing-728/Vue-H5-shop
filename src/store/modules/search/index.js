import Vue from 'vue';
import { getHotKeywordsData, getAttrsData } from '../../../api/search/index';
import config from '../../../assets/js/config/config';

export default {
    namespaced: true,
    state: {
        hotKeywords: '',
        attrs: []
    },
    mutations: {
        ["SET_HOTKEY"](state, payload) {
            state.hotKeywords = payload.hotKeywords;
        },
        ["SET_ATTRS"](state, payload) {
            state.attrs = payload.attrs;
        }
    },
    actions: {
        getHotKeywords(conText, payload) {
            getHotKeywordsData().then((res) => {
                console.log('store-getHotKeywordsData', res);
                if(res.code === 200) {
                    conText.commit("SET_HOTKEY", {hotKeywords: res.data})
                }
            })
        },
        getAttrs(conText, payload) {
            getAttrsData(payload.keyword).then((res) => {
                console.log('store-getAttrs', res)
            })
        }
    }
}