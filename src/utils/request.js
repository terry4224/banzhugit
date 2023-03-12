import axios from 'axios';
import { message } from "../utils/message.js";
import { ElLoading } from 'element-plus';
const API = axios.create({
    // baseURL: 'http://120.46.206.152:29000',
    baseURL: 'http://192.168.43.4:8080', //我的局域网
    // timeout:3000
  });
    //定义变量
    let loading;
    //定义开始加载函数
  function startLoading() {
    //创建loading实例
      loading = ElLoading.service({
          lock: true,
          text: "加载中...",
          background: 'rgba(0,0,0,0.8)'
      })
  }
  //定义关闭加载函数
  function endLoading() {
      loading.close();
  }
  //添加请求拦截
  API.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      //请求前开启加载函数
      startLoading();
      return config;
    }, function (error) {
      // 对请求错误做些什么
      message("请求超时","warning") ;
      endLoading();
    });
    // 添加响应拦截器
    API.interceptors.response.use(function (response) {
    //对响应数据做点什么
    //响应之后延迟3秒触发关闭加载函数
      endLoading();
    return response;
  }, function (error) {
    // 对响应错误做点什么
      message("请求超时","warning") ;
      endLoading();
  });
  export {API}