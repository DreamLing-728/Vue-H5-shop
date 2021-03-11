/* eslint-disable */
import echo from '../libs/echo';
/* eslint-enable */

function lazyImg(){
    echo.init({
        offset: 200, // 提前加载的像素
        throttle: 0     // 延迟加载的时间
    })
}

export default {
    lazyImg
}