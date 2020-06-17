import Vue from 'vue'
import VueRouter from 'vue-router'
// import main from '../components/mian'

import HomeDefault from '../components/HomeDefault'
import home from '../components/Home'

Vue.use(VueRouter)

const routes = [

    {
        path:'/',
        component:home,
        //子路由
        children:[
            //默认页面
            {path:'',component: HomeDefault}
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
