import ajax from './ajax';


//请求登录

export function reqLogin(username,password){
    ajax({
        method:'post',
        url:'./login',
        data:{
            username,
            password
        }
    })
}


const name='admin'
const pwd='admin'
reqLogin(name,pwd)
//将实参数据赋值给形参变量