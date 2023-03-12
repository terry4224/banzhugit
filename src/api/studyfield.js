// 学习园地
import { API } from '../utils/request.js';
const getdatalist = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 批量上传
const upload = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 单个删除
const deletesimbal = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 批量删除
const deletesimbalss = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
export{getdatalist,upload,deletesimbal,deletesimbalss}