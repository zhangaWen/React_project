import React,{Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import login from './images/logo.png'
import './login.less'
// import { min } from 'moment';
class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        message.success('发送Ajax请求')
    }
    validatepwd = (rules,value,callback)=>{
        value = value.trim();
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>4){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成')
        }else{
            callback()
        }
    }
    render(){
        const {getFieldDecorator} = this.props.form
        return(
            <div className="login">
                <div className="login-header">
                    <img src={login} alt="login"/>
                    <h1>後台管理系統</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username',{
                                    //配置对象：属性名是一些特定的名称
                                    initialValue:'',//初始值
                                    rules:[
                                        //声明式验证
                                        {required:true,whitespace:true,message:'用户名是必须'},
                                        {min:4,message:'用户名不能小于4位'},
                                        {max:12,message:'用户名不能大于12位'},
                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                            
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password',{
                                    initialValue:'',
                                    rules:[
                                        {validator:this.validatepwd}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                            
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
const WrapperForm = Form.create()(Login)
export default WrapperForm