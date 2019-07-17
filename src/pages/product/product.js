import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProduceHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
export default class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path="/product" exact component={ProduceHome}/>
                <Route path="/product/addupdate" component={ProductAddUpdate}/>
                <Route path="/product/detail" component={ProductDetail}/>
                <Redirect to='product'/>
            </Switch>
        )
    }
}