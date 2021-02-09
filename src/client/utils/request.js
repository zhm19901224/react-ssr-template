import axios from 'axios'

// 用于创建吗request方法
export default (isServer) => function requeset(url, method, params = {}, otherConfigs = {}){
    let baseConfig = {
        headers:{
            'content-type':' application/json'
        },
        method,
        url,
        baseURL: isServer ? 'http://47.95.113.63/ssr' : '/'
    }
    if (method === 'get') {
        baseConfig.params = params;
    } else {
        baseConfig.data = params;
    }
    return axios(Object.assign(baseConfig, otherConfigs))
}