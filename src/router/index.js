import Vue from 'vue'
import VueRouter from 'vue-router'
// import main from '../components/mian'

import HomeDefault from '../components/HomeDefault'
import home from '../components/Home'
import Deliveryrecord from  '../components/facility/Deliveryrecord'

Vue.use(VueRouter)

const routes = [

    {
        path:'/main',
        component:home,
        //子路由
        children:[
            //默认页面
            {path:'',component: HomeDefault},
            {path:'/main/Deliveryrecord',component:Deliveryrecord}
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
