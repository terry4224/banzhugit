// 中心简介 保存简介
import{ API } from '../utils/request.js';
    let  saveData = async  function(params){
     return await   API(params).then((res)=>{
         if(res){
            return res.data;
         }
        });
    }
      // 获取简介 
       let  getBref = async  function(params){
        return await   API(params).then((res)=>{
            if(res){
               return res.data.data;
            }
           });
       }
export {saveData,getBref}