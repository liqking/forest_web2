export default {
    namespaced:true,
    state:{
        setAddPestVis:false
    },
    mutations:{
        setVis(state,param){
            console.log("dddddddddddd")
            state.setAddPestVis=param;
            console.log(state.setAddPestVis)
        }
    }
}