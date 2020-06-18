import {getExperts,getExpertsTalksPage} from '../service/Experts'

export default {
    namespaced: true,
    state: {
        open: true,
        /*专家分页*/
        expertspage: [],
        /*专家要解决的事件分页*/
        expertsTalks:[]
    },
    mutations: {
        setExperts(state, expertspage) {
            state.expertspage = expertspage;
        },
        setExpertsTalks(state,expertsTalks){
            state.expertsTalks=expertsTalks;
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
       }



    }
}