import {getExperts,getExpertsTalksPage,getExp} from '../service/Experts'

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
        showExperts:{}
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
            /*根据id查专家*/
            let experts = await getExp(id);
            context.commit('setExp', experts);
        },
        async setshowExperts(context,id){
            /*根据id查专家*/
            let experts = await getExp(id);
            context.commit('setshowExperts', experts);
        }



    }
}