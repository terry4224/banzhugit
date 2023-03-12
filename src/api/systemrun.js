// 系统运行情况
import{ API } from '../utils/request.js';
let getData = async function (params) {
    return await API(params).then((res) => {
        return res.data
    });
}
export { getData }