import axios from 'axios';

function request(url, type='get') {
    let config = {}
    if(type === 'get') {
        config = {
            method: type
        }
    }
    return axios(url, config).then((res) => {
        // console.log('axios', res)
        return res.data;
    })
}

export {
    request
}