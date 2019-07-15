import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
//添加请求拦截器：让post请求的请求体格式转化为urlencoded格式
//在真正发请求钱执行
axios.interceptors.request.use(function(config){
    //得到请求方式和请求体数据
    const {method,data} = config
    //处理post请求，将data对象转化为query参数格式字符串
    if(method.toLowerCase === 'post' && typeof data === 'object'){
        config.data = qs.stringify(data)
    }
    return config
    
})

//添加响应拦截器
//功能1：让请求成功的结果不再是response，而是response.data的值
//
//
//
axios.interceptors.response.use(function(response){
    return response.data
},function(error){
    message.error('请求出错',+error.message)
    //return Promise.reject(error)
    //返回一个pending状态的promise，中断promise链
    return new Promise(()=>{})
})
export default axios
