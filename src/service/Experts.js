import axios from 'axios'

export const  getExperts=async(currentpage,pagesize)=>{
    let response = await axios({
        url:'/forest_sys/showExperts',
        method:'get',
        params:{
            curentPage:currentpage,
            pageSize:pagesize
        }
    });
    return  response.data;
}