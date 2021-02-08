const path = require('path'); // 引入path模块

function resolve(dir) {
    return path.join(__dirname, dir) //path.join(_dirname)设置绝对路径
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                components: "@/components",
                assets: "@/assets",
            }
        }
    }
}


