import Vue from 'vue'
import App from './App'
import moment from 'moment'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己做的axios（Vue插件）
import HttpTool from './publign/http'
import router from './router'
import '@/assets/css/index.css'

Vue.use(ElementUI)
    // use会自动执行install方法
Vue.use(HttpTool)

Vue.config.productionTip = false

Vue.filter('dategs', (v) => {
    // YYYY-MM-DD hh:mm:ss
    v = moment(v).format('YYYY-MM-DD')
    return v
})

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})