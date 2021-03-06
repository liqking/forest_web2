import axios from 'axios'


export const  getExperts=async(currentpage,pagesize,name,specialties,work)=>{
    let response = await axios({
        url:'/forest_sys/showExperts',
        method:'get',
        params:{
            curentPage:currentpage,
            pageSize:pagesize,
            name:name,
            specialties:specialties,
            work:work
        }
    });
    return  response.data;
}
export const getExpertsTalksPage=async (currentpage,pagesize)=>{
    let response = await axios({
        url:'/forest_sys/inciden',
        method:'get',
        params:{
            curentPage:currentpage,
            pageSize:pagesize
        }
    });
    return  response.data;
}
export const getExp=async (id)=>{
    let response = await axios({
        url:'/forest_sys/look',
        method:'get',
        params:{
            expertsId:id
        }
    });
    return  response.data;
}
export const getEvent=async (id)=>{
    let response = await axios({
        url:'/forest_sys/talks',
        method:'get',
        params:{
            eventId:id
        }
    });
    return  response.data;
}
export const getExpertsList=async (disaster)=>{
    let response = await axios({
        url:'/forest_sys/disasterExperts',
        method:'get',
        params:{
            disaster:disaster
        }
    });
    return  response.data;
}
