import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import users from '@/components/users'
import rights from '@/components/rights'
import roles from '@/components/roles'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        component: login
    }, {
        path: '/',
        component: home,
        children: [{
            path: '/users',
            component: users
        }, {
            path: '/rights',
            component: rights
        }, {
            path: '/roles',
            component: roles
        }]
    }]
})