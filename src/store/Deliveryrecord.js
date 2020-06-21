export default{
    namespaced:true,
    state:{
        idList:[]
    },
    mutations:{
        pushIdList(state,addList){
            state.idList.push(addList);
        },
        removeId(state,id){
            state.idList = state.idList.filter((item) => {
                return item != id;
            });
        },
        emptyIdList(state){
            state.idList = [];
        }
    }


}