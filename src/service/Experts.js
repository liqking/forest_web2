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