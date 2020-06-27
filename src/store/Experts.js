import {getExperts,getExpertsTalksPage,getExp,getEvent,getExpertsList} from '../service/Experts'

export default {
    namespaced: true,
    state: {
        /*当前页数和当前条数*/
        pageNumber:1,
        number:4,
        search:{
            name: '',
            specialties: '',
            work: '',
        },
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
        setExperts1(state, expertspage) {
            console.log(expertspage);
            state.expertspage = expertspage;
        },
        setExpertsTalks(state,expertsTalks){
            state.expertsTalks=expertsTalks;
        },
        setExp1(state,experts){
            state.experts=experts;
        },
        setshowExperts1(state,showExperts){
            state.showExperts=showExperts;
        },
        setEvent(state,eventBean){
            state.eventBean=eventBean;
        },
        setExpertsList1(state,expertsList){
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

        },
        setPageNumber(state, num){
            state.pageNumber = num;
        },
        setNumber(state, num){
            state.number = num;
        },
        setSearch(state, rulefrom){
            state.search = rulefrom;
        }

    },
    actions: {
        async setExperts(context, page) {

            let experts = await getExperts(page.currentpage, page.pagesize,page.name,page.specialties,page.work);
            context.commit('setExperts1', experts);
        },
       async setExpertsTalksPage(context, page){
           let experts = await getExpertsTalksPage(page.currentpage, page.pagesize);
           context.commit('setExpertsTalks', experts);
       },
        async setExp(context,id){
            /*根据id查专家，显示详情用*/
            let experts = await getExp(id);
            context.commit('setExp1', experts);
        },
        async setshowExperts(context,id){
            /*根据id查专家,修改用*/
            let experts = await getExp(id);
            context.commit('setshowExperts1', experts);
        },
        async setEventBean(context,id){
            /*根据id查要会谈的事情的详情*/
            let experts = await getEvent(id);
            context.commit('setEvent', experts);
        },
        async setExpertsList(context,disaster){
            /*根据灾害类型查相关专家*/
            let experts = await getExpertsList(disaster);
            context.commit('setExpertsList1', experts);
        }




    }
}