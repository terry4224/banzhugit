// 共产党员责任区
import { API } from '../utils/request.js';
// 获取中心简介
const getdata = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 新增
const adddata = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 修改
const changedata = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 删除
const delectdata = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
export {getdata,adddata,changedata,delectdata}