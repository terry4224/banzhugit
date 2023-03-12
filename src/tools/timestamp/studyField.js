// 更新时间
function updateDate(arr){
    for (let i = 0; i < arr.length; i++) {
        var timdedetail = arr[i].createTime;//假如是10位毫秒需要乘1000
        //获取年份
        var year = new Date(timdedetail).getFullYear();
        //获取月份，获取的月份比实际小1，所以在使用的时候需要+1
        var month = new Date(timdedetail).getMonth() + 1;
        //获取日
        var date = new Date(timdedetail).getDate();
        //获取时
        var hours = new Date(timdedetail).getHours();
        //获取分
        var minutes = new Date(timdedetail).getMinutes();
        //获取秒
        var seconds = new Date(timdedetail).getSeconds();
        //组合格式为年-月-日 时：分：秒（2021-7-5 21:21:21）
        var time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
        //输出样式：2020-10-25 14:25:36
        arr[i].createTime=time
    }
}
export {updateDate}