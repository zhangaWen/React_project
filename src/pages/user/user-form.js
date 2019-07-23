import React,{PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Input} from 'antd'

const Option = Select.Option
class UserForm extends PureComponent{
    static propTypes={
        setForm:PropTypes.func.isRequired,
        roles:PropTypes.array.isRequired,
        user:PropTypes.object
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        const {roles,user} = this.props
        const {getFieldDecorator} = this.props.form
        const formItemLayout={
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        return(
            <Form {...formItemLayout}>
                <Form.Item label="用户名">
                    {
                        getFieldDecorator('username',{
                            initialValue:user.username,
                            rules:[
                                { required: true, message: '必须输入用户名' }
                            ]
                        })(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                </Form.Item>
                {
                    user._id?null:(
                        <Form.Item label="密码">
                            {
                                getFieldDecorator('password',{
                                    initialValue:user.password,
                                    rules:[
                                        { required: true, message: '必须输入密码' }
                                    ]
                                })(
                                    <Input type="password" placeholder='请输入密码'/>
                                )
                            }
                        </Form.Item>
                    )
                }
                <Form.Item label="手机号">
                    {
                        getFieldDecorator('phone',{
                            initialValue:user.phone,
                            rules:[
                                { required: true, message: '必须输入手机号' }
                            ]
                        })(
                            <Input placeholder="请输入手机号"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="邮箱">
                    {
                        getFieldDecorator('email',{
                            initialValue:user.email,
                        })(
                            <Input placeholder="请输入邮箱"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="角色">
                    {
                        getFieldDecorator('role_id',{
                            initialValue:user.role_id,
                            rules:[
                                { required: true, message: '必须输入指定角色' }
                            ]
                        })(
                            <Select>
                                {
                                    roles.map(role => <Option key={role._id} 
                                    value={role._id}>{role.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(UserForm)