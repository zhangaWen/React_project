import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'

import LinkButton from '../link-button/index'
import {reqWeather} from '../../api/index'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.less'
// import { async } from 'q';


class Header extends Component{
    state = {
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:''
    }
    // 退出登录
    logout = ()=>{
        Modal.confirm({
            title:'确定退出吗',
            onOk:()=>{
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel:()=>{
                return
            }
        })
    }
    // 根据当前请求的path得到对应的title
    getTitle = ()=>{
        let title = ''
        const path = this.props.location.pathname

        menuList.forEach(item =>{
            if(item.key===path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    // 获取天气信息
    getWeather = async ()=>{
        //发送请求
        const {dayPictureUrl,weather} = await reqWeather('北京')
        //更新状态
        this.setState({
            dayPictureUrl,
            weather
        }) 
    }
    componentDidMount(){
        this.intervalId = setInterval(()=>{
            this.setState({
                currentTime:formateDate(Date.now())
            })
        },1000)
        this.getWeather()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render(){
        const {currentTime,dayPictureUrl,weather} = this.state
        const user = memoryUtils.user
        //得到当前需要显示的title
        const title = this.getTitle()
        return(
            <div className="header">
                <div className="header-top">
                    欢迎，{user.username} &nbsp;&nbsp;
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)