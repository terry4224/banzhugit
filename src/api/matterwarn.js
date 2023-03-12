// 事项提醒
import{ API } from '../utils/request.js';
    let  getData = async  function(params){
     return await   API(params).then((res)=>{
         if(res){
            return res.data;
         }
        });
    }
export {getData}