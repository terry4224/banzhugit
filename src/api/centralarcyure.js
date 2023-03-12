// 中心架构
import { API } from '../utils/request.js';

let gettreedata = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

let save = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

let update = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

let findAllAndEmployee = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

let delet = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}

export { gettreedata,save,update,findAllAndEmployee,delet }