import config from '../../assets/js/config/config';
import { request } from '../../assets/js/libs/request';

// 搜索框搜索
export function getInputSearch(keyword) {
    return request(config.baseApi + "/home/goods/param?kwords=" + keyword + "&token=" + config.token);
}