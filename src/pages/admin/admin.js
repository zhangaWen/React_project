import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
export default class Admin extends Component{
    render(){
        const user = memoryUtils.user
        if(user._id){
            return <Redirect to='/login'/>
        }
        return(
            <div>
                hello,{user.username}
            </div>
        )
    }
}