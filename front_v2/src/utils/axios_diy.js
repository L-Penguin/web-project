import axios from 'axios';
import Vue from 'vue'
import vm from '../main'

const _this = new Vue()

const axios_diy = axios.create({
    // 设置清求base url
    baseURL: process.env.VUE_APP_BASE_API,
    // 设置超时，单位ms
    timeout: 50000,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    // },
    // withCredentials: true
})

// 接收拦截，用于统一处理响应，包括响应成功的页面提示和响应失败的错误提示
axios_diy.interceptors.response.use(res=>{
    // if (res.data.status) _this.$Message.success(res.data.msg);
    return res.data;
}, err=> {
    // 当错误状态为Unauthorized，提示token过期，跳转首页
    if (err.response?.statusText === "Unauthorized") {
        _this.$Message.error("token expired, please login again");
        sessionStorage.clear(); 
        vm.$router.replace("/");
    } else {
        // 其余错误统一提示错误信息
        _this.$Message.error(err.response.data.msg);
        if (err.response.data) {
            return err.response.data.err;
        }
    }
})

export default axios_diy;