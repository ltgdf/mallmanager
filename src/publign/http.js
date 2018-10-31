import axios from 'axios'

const HttpTool = {}
HttpTool.install = (Vue) => {
    // 设置axios请求的baseURL（基础路径）
    axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
    Vue.prototype.$http = axios
}

export default HttpTool