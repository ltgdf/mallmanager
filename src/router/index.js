import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        component: login
    }, {
        path: '/',
        component: home
    }]
})