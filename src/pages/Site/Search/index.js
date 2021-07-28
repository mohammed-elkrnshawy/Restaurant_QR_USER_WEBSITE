import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Checkbox, Row, Col } from 'antd';
import { Rate } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const index = () => {
  function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
  return (
      <Layout>
   
    <Layout>
      <Sider width={ 350} style={{
        backgroundColor:'white'
      }} >
       
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 ,marginTop:100}}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Category">
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2"  title="City" style={{
            alignContent:'center'
          }}>
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
             <Row style={{
            alignItems:'center' ,justifyContent:'center'
          }}>
               <Col span={13}>
                 <Checkbox value="1"><Rate disabled  value={1} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="2"><Rate disabled  value={2} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="3"><Rate disabled  value={3} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="4"><Rate disabled  value={4} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="5"><Rate disabled  value={5} /></Checkbox>
               </Col>
             </Row>
           </Checkbox.Group>
          </SubMenu>
          <SubMenu key="sub3"  title="Rate">
             <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
             <Row style={{
            alignItems:'center' ,justifyContent:'center'
          }}>
               <Col span={13}>
                 <Checkbox value="1"><Rate disabled  value={1} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="2"><Rate disabled  value={2} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="3"><Rate disabled  value={3} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="4"><Rate disabled  value={4} /></Checkbox>
               </Col>
               <Col span={13}>
                 <Checkbox value="5"><Rate disabled  value={5} /></Checkbox>
               </Col>
             </Row>
           </Checkbox.Group>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px',     backgroundColor:'white' }}>
       
        <Content
          
          style={{
            padding: 24,
            margin: 0,
            height: 'inhert',
            backgroundColor:'white'
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>
 
  )
};

export default index;



