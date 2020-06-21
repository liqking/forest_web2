import {getExperts,getExpertsTalksPage,getExp,getEvent,getExpertsList} from '../service/Experts'

export default {
    namespaced: true,
    state: {
        open: true,
        /*专家分页*/
        expertspage: [],
        /*专家要解决的事件分页*/
        expertsTalks:[],
        /*专家*/
        experts:{},
        /*专家详情对象*/
        showExperts:{},
        /*要商谈的事件*/
        eventBean:{},
        /*全部专家集合*/
        expertsList:[]
    },
    mutations: {
        setExperts(state, expertspage) {
            state.expertspage = expertspage;
        },
        setExpertsTalks(state,expertsTalks){
            state.expertsTalks=expertsTalks;
        },
        setExp(state,experts){
            state.experts=experts;
        },
        setshowExperts(state,showExperts){
            state.showExperts=showExperts;
        },
        setEvent(state,eventBean){
            state.eventBean=eventBean;
        },
        setExpertsList(state,expertsList){
            console.log(expertsList);
           const data=[];
            for(let ele of expertsList) {
                data.push({
                    key: ele.id,
                    label: ele.expertsName

                });
            }
            console.log(data);
            state.expertsList=data;

        }

    },
    actions: {
        async setExperts(context, page) {

            let experts = await getExperts(page.currentpage, page.pagesize,page.name,page.specialties,page.work);
            context.commit('setExperts', experts);
        },
       async setExpertsTalksPage(context, page){
           let experts = await getExpertsTalksPage(page.currentpage, page.pagesize);
           context.commit('setExpertsTalks', experts);
       },
        async setExp(context,id){
            /*根据id查专家，显示详情用*/
            let experts = await getExp(id);
            context.commit('setExp', experts);
        },
        async setshowExperts(context,id){
            /*根据id查专家,修改用*/
            let experts = await getExp(id);
            context.commit('setshowExperts', experts);
        },
        async setEventBean(context,id){
            /*根据id查要会谈的事情的详情*/
            let experts = await getEvent(id);
            context.commit('setEvent', experts);
        },
        async setExpertsList(context,disaster){
            /*根据灾害类型查相关专家*/
            let experts = await getExpertsList(disaster);
            context.commit('setExpertsList', experts);
        }




    }
}