import config from '../../assets/js/config/config';
import { request } from '../../assets/js/libs/request';

// 首页轮播图
export function getSwiperData() {
    return request(config.BASE_URL+ config.PATH + "/home/index/slide?token=" + config.TOKEN);
}

// 首页分类导航
export function getNavData() {
    return request(config.BASE_URL+ config.PATH + "/home/index/nav?token=" + config.TOKEN);
}