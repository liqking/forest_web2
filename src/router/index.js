import Vue from 'vue'
import VueRouter from 'vue-router'
// import main from '../components/mian'

import HomeDefault from '../components/HomeDefault'
import home from '../components/Home'
import Deliveryrecord from  '../components/facility/Deliveryrecord'
import  Experts from '../components/Experts'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:home,
        //子路由
        children:[
            //默认页面
            {path:'',component: HomeDefault},
            {path:'Deliveryrecord',component:Deliveryrecord},
            {path:'',component: HomeDefault},
            //专家页面
            {name:'Experts',path:'/Experts',component:Experts}
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
