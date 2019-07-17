import React, { Component } from 'react'
import {Card,Button,Icon,Table,message,Modal} from 'antd'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api'
import LinkButton from '../../components/link-button'

import AddUpdateForm from './add-update-form'

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
