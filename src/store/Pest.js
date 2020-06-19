export default {
    namespaced:true,
    state:{
        setAddPestVis:false
    },
    mutations:{
        setVis(state,param){

            state.setAddPestVis=param;
            console.log(state.setAddPestVis)
        }
    }
}