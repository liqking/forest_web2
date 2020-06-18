import Vue from 'vue'
import VueRouter from 'vue-router'
// import main from '../components/mian'

import HomeDefault from '../components/HomeDefault'
import home from '../components/Home'
import Deliveryrecord from  '../components/facility/Deliveryrecord'
import Management from '../components/facility/Management'
import Login from "../components/Login";
import Experts from "../components/Experts";

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:home,
        //子路由
        children:[
            //默认页面
            {path:'',component: HomeDefault},
            //药剂页面
            {path:'/Deliveryrecord',component:Deliveryrecord},
            {path:'/Management',component:Management },
            //专家页面
            {path:'/Experts',component:Experts}
        ],
    },
    {
        path:'/login',component:Login

    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
