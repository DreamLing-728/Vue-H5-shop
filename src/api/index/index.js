import config from '../../assets/js/config/config';
import { request } from '../../assets/js/libs/request';

// 首页轮播图
export function getSwiperData() {
    return request(config.BASE_URL + config.PATH + "/home/index/slide?token=" + config.TOKEN);
}

// 首页分类导航
export function getNavData() {
    return request(config.BASE_URL + config.PATH + "/home/index/nav?token=" + config.TOKEN);
}

// 首页商品获取
export function getGoodsData() {
    return request(config.BASE_URL + config.PATH + "/home/index/goodsLevel?token=" + config.TOKEN);
}

// 首页商品推荐
export function getRecomData() {
    return request(config.BASE_URL + config.PATH + "/home/index/recom?token=" + config.TOKEN);
}

// 左侧分类列表
export function getClassifyData() {
    return request(config.BASE_URL + config.PATH + "/home/category/menu?token=" + config.TOKEN);
}
