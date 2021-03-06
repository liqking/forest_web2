import Vue from 'vue'
import VueRouter from 'vue-router'
// import main from '../components/mian'

import HomeDefault from '../components/HomeDefault'
import home from '../components/Home'
import Deliveryrecord from  '../components/facility/Deliveryrecord'
import Management from '../components/facility/Management'
import Login from "../components/Login";
import Experts from "../components/Experts";
import Area from "../components/Area";
import Classes from "../components/Classes";
import Event from "../components/Event";
import Pest from "../components/Pest";
import User from "../components/User";
import ExpertsTalks from '../components/ExpertsTalks';
import Log from "../components/Log";
import Disease from "../components/Disease.vue"
import Rats from "../components/Rats"

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
            {path:'/Experts',component:Experts},
            //灾情防治
            {path:'/Area',component:Area},
            {path:'/Classes',component:Classes},
            {path:'/Event',component:Event},
            //资料管理页面
            {path: '/Pest', component: Pest},
            {path: '/Disease', component: Disease},
            {path: '/Rats', component: Rats},
            //用户管理
            {path: '/user', component: User},
            //专家需要会商的页面
            {path:'/ExpertsTalks',component:ExpertsTalks},
            //日记页面
            {path:'/log',component:Log}
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

const originalPush = VueRouter.prototype.push
    VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
