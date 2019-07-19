// 包含应用中所有请求接口的函数：接口请求函数
//函数的返回值都是promise对象
import jsonp from 'jsonp'
import ajax from './ajax'
import {message} from 'antd'
const BASE = ''
export const reqLogin = (username,password)=> ajax.post(BASE + '/login',{username,password})


//发送jsonp请求获取天气消息

export const reqWeather = (city)=>{
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error && data.error===0){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve ({dayPictureUrl, weather})
            }else { // 失败的
                message.error('获取天气信息失败')
              }
        })
    })
}

//获取分类列表

export const reqCategorys =()=>ajax(BASE+'/manage/category/list')

//添加分类

export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add', {categoryName})

//修改分类
export const reqUpdateCategory =({categoryId, categoryName})=>ajax.post(BASE+'/manage/category/update',{categoryId, categoryName})
// 获取商品的分类列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {
    params: { // 包含所有query参数的对象
      pageNum,
      pageSize
    }
  })


//根据name/desc 搜索产品列表
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType
}) => ajax(BASE + '/manage/product/search',{
    // method:'GET',
    params:{
        pageNum,
        pageSize,
        [searchType]:searchName
    }
})

//对商品进行上架下架处理
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {
    method: 'POST',
    data: {
      productId,
      status
    }
  })
//发送请求的第二种方式
// ajax.post(BASE+'/manage/product/updateStatus',{
//     productId,
//     status
// })


