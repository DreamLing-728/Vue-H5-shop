import config from '../../assets/js/config/config';
import { request } from '../../assets/js/libs/request';

// 获取热门关键词
export function getHotKeywordsData() {
    return request(config.BASE_URL + config.PATH + "/home/public/hotwords?token=" + config.TOKEN);
}

// 搜索结果
export function getAttrsData(keyword) {
    console.log('api-getAttrsData-keyword', keyword);
    return request(config.BASE_URL + config.PATH + "/home/goods/param?kwords=" + keyword + '&token=' + config.TOKEN);
}