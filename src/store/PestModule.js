import axios from 'axios'
export default {
    namespaced:true,
    state:{
        setAddPestVis:false,
        pestData:[],
        currentPage:1,
        pageSize:5,
        total:0
    },
    mutations:{
        setVis(state,param){

            state.setAddPestVis=param;

        },
        async showPestData(state){
            let response = await axios({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                url: "/forest_sys/showPest",
                method: "post",
                params: {
                    curPage: state.currentPage,
                    pageSize: state.pageSize
                }
            });

            state.total = response.data.total;
            state.pageSize = response.data.pageSize;
            state.pestData = response.data.list;
        },
        changeCurPage(state,newPage){
            state.currentPage=newPage;

        },
        changePageSize(state,pageSize){
            state.pageSize=pageSize;

        }
    }
}