import React,{Component} from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import { message } from 'antd';

import Admin from './pages/admin/admin'
import Login from './pages/login/login'
export default class App extends Component{
    handleClick=()=>{
        message.success('成功了...')
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>  
                    <Route path='/' component={Admin}/> 
                </Switch>
            </BrowserRouter>
        )
    }
}
