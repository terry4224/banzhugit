// 检修计划
import { API } from '../utils/request.js';
const getdatacheck = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
export{getdatacheck}