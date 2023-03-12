// 绩效公示
import { API } from '../utils/request.js';
// 分页查询
const searchdata = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 删除
const delectinfor = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
export {searchdata,delectinfor}