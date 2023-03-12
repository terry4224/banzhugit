// 项目一览表 获取表格数据接口
import{ API } from '../utils/request.js';
    let  getData = async  function(params){
     return await   API(params).then((res)=>{
        return res.data
        });
    }
       let  importData = async  function(params){
        return await   API(params).then((res)=>{
            if(res){
               return res.data;
            }
           });
       }

export {getData,importData}