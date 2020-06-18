import {getExperts} from '../service/Experts'

export default {
    namespaced: true,
    state: {
        open: true,
        expertspage: []
    },
    mutations: {
        setExperts(state, expertspage) {
            state.expertspage = expertspage;
        }
    },
    actions: {
        async setExperts(context, page) {

            let experts = await getExperts(page.currentpage, page.pagesize);
            context.commit('setExperts', experts);
        }


    }
}