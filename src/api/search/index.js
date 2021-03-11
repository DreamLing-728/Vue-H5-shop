import config from '../../assets/js/config/config';
import { request } from '../../assets/js/libs/request';

// 获取热门关键词
export function getHotKeywordsData() {
    return request(config.BASE_URL + config.PATH + "/home/public/hotwords?token=" + config.TOKEN);
}

// 商品属性
export function getAttrsData(keyword) {
    // console.log('api-getAttrsData-keyword', keyword);
    return request(config.BASE_URL + config.PATH + "/home/goods/param?kwords=" + keyword + '&token=' + config.TOKEN);
}

// 搜索结果
export function getSearchData(data) {
    // 获取参数
    let kwords = data.kwords ? data.kwords : '';
    let param = data.param && data.param !== '[]' ? data.param : '';
    let page = data.page ? data.page : 1;
    let price1 = data.price1 ? data.price1 : '';
    let price2 = data.price2 ? data.price2 : '';
    let otype = data.otype ? data.otype : '';
    let cid = data.cid ? data.cid : '';
    // 拼接url
    let url = config.BASE_URL + config.PATH + "/home/goods/search?kwords=" + kwords + "&param=" + param + "&page=" + page + "&price1=" + price1 + "&price2=" + price2 + '&otype=' + otype + '&cid=' + cid + '&token=' + config.TOKEN;
    return request(url);
}

