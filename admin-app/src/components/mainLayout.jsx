import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { ToastContainer} from 'react-toastify';
import { Button, Layout, Menu, theme } from 'antd';
import { AiOutlineDashboard } from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import { FaClipboardList } from "react-icons/fa";
import { FaBlogger } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';



const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate  = useNavigate();

  const AuthState = useSelector((state)=>state.auth.user)


  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical pl-2" >
          <h2 className='open px-3 text-center fs-4 mb-0 py-3'>
            
            <span className='sm'>Sammy</span>
            <span className='sm-logo'>S</span>
            </h2>
          
          </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key=="signout"){}
            else{
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4'/>,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <FaRegUser className='fs-4'/>,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <CiShoppingCart className='fs-4'/>,
              label: 'catalog',
              children:[
                {
                  key: 'Product',
                  icon: <CiShoppingCart className='fs-4'/>,
                  label: 'Add Product',
                },
                {
                  key: 'Product-list',
                  icon: <CiShoppingCart className='fs-4'/>,
                  label: 'Product List',
                },
                {
                  key: 'Brand',
                  icon: <SiBrandfolder className='fs-4'/>,
                  label: 'Brand',
                },
                {
                  key: 'Brand-list',
                  icon: <SiBrandfolder className='fs-4'/>,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategory  className='fs-4'/>,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategory  className='fs-4'/>,
                  label: 'Category List',
                },



              ]
            },
            {
              key: 'Order',
              icon: <FaClipboardList className='fs-4'/>,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <FaBlogger className='fs-4'/>,
              label: 'Blogs',
              children:[
                {
                  key: 'Blog',
                  icon: <ImBlog className='fs-4'/>,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBlogger className='fs-4'/>,
                  label: 'Blog List',
                },
                {
                  key: 'Blog-Category',
                  icon: <ImBlog className='fs-4'/>,
                  label: 'Add Blog Category',
                },
                {
                  key: 'Blog-category-list',
                  icon: <FaBlogger className='fs-4'/>,
                  label: 'Blog Category List',
                },
                



              ]
            },
            
          ]}
        />
      </Sider>
      <Layout>
        <Header
        className='d-flex justify-content-between ps-3 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          <div className='d-flex  align-items-center'>
            <div className='fs-4 px-3'><IoIosNotifications /></div>
            <div className='d-flex align-items-center'>
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <h5 className='mb-0 py-0'>&{AuthState.firstname}</h5>
                <p className='mt-0 pt-0'>{AuthState.email}</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer 
          position="top-right"
          autoClose={250}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;