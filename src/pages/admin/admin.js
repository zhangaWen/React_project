import React,{Component} from 'react'
import {Redirect,Route} from 'react-router-dom'
import {Layout, Switch} from 'antd'

import memoryUtils from '../../utils/memoryUtils'

import LeftNav from '../../components/left-nav/index'
import Header from '../../components/header/index'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const {Footer,Sider,Content} = Layout
export default class Admin extends Component{
    render(){
        const user = memoryUtils.user
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return(
            <Layout style={{width:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{background:'red'}}>
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    
                </Layout>
                <Footer>
                    
                </Footer>
            </Layout>
        )
    }
}