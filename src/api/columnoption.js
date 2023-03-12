// 栏目配置
import { API } from '../utils/request.js';
// 获取中心简介
const centbrefer = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 中心简介保存
const save = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 获取党支部
const partybranchs = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 保存党支部
const savepartybranchs = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 获取工会
const getlabor = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 保存工会
const savegetlabor = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 获取生产管控
const Productioncontrol = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 保存生产管控
const saveductioncontrol = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 获取项目管理
const projectManger = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 保存项目管理
const saveprojectManger = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 业务提醒
const businessreminder = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
// 保存业务提醒
const savebusinessreminder = async function (params) {
    return await API(params).then((res) => {
        if (res) {
            return res.data;
        }
    });
}
export {
    centbrefer,
    save,
    partybranchs,
    savepartybranchs,
    getlabor,
    savegetlabor,
    Productioncontrol,
    saveductioncontrol,
    projectManger,
    saveprojectManger
}