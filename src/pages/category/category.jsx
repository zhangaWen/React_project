import React, { Component } from 'react'
import {Card,Button,Icon,Table,message,Modal} from 'antd'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import LinkButton from '../../components/link-button'

import AddUpdateForm from './add-update-form'
// import { async } from 'q';

/**
 * 分类管理
 */
export default class Category extends Component {
  state = {
    categorys: [], // 所有分类的数组
    loading: false, // 是否正在请求加载中
    showStatus: 0   // 0: 不显示, 1: 显示添加, 2: 显示修改
  }
  // 初始化table的所有信息的数组
initCloumns =()=>{
  this.columns=[
    {
      title: '分类的名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 300,
      render: (category) => <LinkButton onClick={() => {
        this.category = category // 保存当前分类, 其它地方都可以读取到
        this.setState({ showStatus: 2})
      }}>修改分类</LinkButton>
    },
  ]
}
/**
 * 异步获取分类列表显示
 */

getCategorys = async ()=>{
  //显示loading
  this.setState({loading:true})
  //发送异步的Ajax请求
  const result = await reqCategorys()
  // console.log(result)
  //隐藏loading
  this.setState({loading:false})
  if(result.status===0){
    //取出分类列表
    const categorys = result.data
    //更新categorys数据
    this.setState({
      categorys
    })
  }else{
    message.error('获取数据失败')
  }
}

//点击确定的回调去添加/修改分类
handleOk = () =>{
  
  //进行表单验证
  this.form.validateFields(async (err,values)=>{
    if(!err){
      const {categoryName} = values
      const {showStatus} = this.state
      
      let result      
      if(showStatus===1){
        result = await reqAddCategory(categoryName)
        console.log(result);
      }else{
        const categoryId = this.category._id
        result = await reqUpdateCategory({categoryId,categoryName})
        console.log(result);

      }

      // this.form.resetFields()
      this.setState({showStatus:0})

      const action = showStatus === 1?'添加':'修改'
      console.log(action);
      //根据结果不同做出不同响应
      if(result.status===0){

        this.getCategorys()
        message.success(action+'分类成功')
      }else{
        message.error(action+'分类失败')
      }
    }
  })
}

// 点击取消的回调
handleCancel = ()=>{
  // this.form.resetFields()
  this.setState({showStatus:0})
}

componentWillMount(){
  this.initCloumns()
}
componentDidMount(){
  this.getCategorys()
}
  

  render() {
    //取出状态数据
    const {categorys, loading, showStatus} = this.state
    //读取更新的分类名称
    const category = this.category || {}
    const extra = (
      <Button type="primary" onClick={()=>{this.setState({ showStatus: 1 })}}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
    return (
      <Card extra={extra}>
          <Table
            bordered={true}
            rowKey="_id"
            loading={loading}
            columns={this.columns}
            dataSource={categorys}
            pagination={{defaultPageSize:6,showQuickJumper:true}}
          />

          <Modal
             title={showStatus===1?'添加分类':'修改分类'}
             visible={showStatus!==0}
             onOk={this.handleOk}
             onCancel={this.handleCancel}
          >
           <AddUpdateForm setForm={form=>{this.form = form}} categoryName={category.name}/>

          </Modal>
      </Card>
    )
  }
}
