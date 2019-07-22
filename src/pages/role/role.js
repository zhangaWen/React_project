import React,{Component} from 'react'
import {Card,Button,Table,Modal,message}  from  'antd'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/Constants'
import AddForm from './add-form'
import AuthForm from './auth-form'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqAddRole,reqUpdateRole,reqRoles} from '../../api'
/**
 * 角色路由
 */
export default class Role extends Component{
    render(){
        return(
            <div>
                Role
            </div>
        )
    }
}