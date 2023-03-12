// 照片管理
import { API } from '../utils/request.js';
// 批量上传
const upload = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 照片列表获取
const getphotolist = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 删除图片
const delectimg = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 修改照片属性
const changeimginfor = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
export { upload,getphotolist,delectimg,changeimginfor}