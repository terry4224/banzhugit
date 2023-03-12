// 工会通知
import{ API } from '../utils/request.js';
// 获取简介
const getbref = async function (params) {
    return await API(params).then((res) => {
        return res.data
    });
}
// 保存通知
const savebref = async function (params) {
    return await API(params).then((res) => {
        return res.data
    });
}
// 获取工会通知列表
const getlist = async function (params) {
    return await API(params).then((res) => {
        return res.data
    });
}
// 获取指定通知列表
const getappointlist = async function (params) {
    return await API(params).then((res) => {
        return res.data
    });
}
// 修改工会通知
const changesavebref = async function (params) {
    return await API(params).then((res) => {
        return res.data
    });
}
// 删除工会通知
const delectuntioce = async function (params) {
    return await API(params).then((res) => {
        return res;
    });
}
export { getbref,savebref,getlist,getappointlist,changesavebref,delectuntioce }