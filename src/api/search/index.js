import config from '../../assets/js/config/config';
import { request } from '../../assets/js/libs/request';

// 获取热门关键词
export function getHotKeywordsData() {
    return request(config.BASE_URL + config.PATH + "/home/public/hotwords?token=" + config.TOKEN);
}

export function getAttrsData(keywords) {
    return request(config.BASE_URL + config.PATH + "/home/goods/param?kwords=" + keywords + '&token=' + config.TOKEN);
}