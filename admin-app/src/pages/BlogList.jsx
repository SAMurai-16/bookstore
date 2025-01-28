import React, { useEffect, useState } from 'react'
import { Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs } from '../features/blog/blogSlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import CustomModal from "../components/CustomModal"
const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'des',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const BlogList = () => {

  const [BlogId,setBlogId] = useState("")
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e) => {
      setIsModalOpen(true);
      setBlogId(e)
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const hideModal = () => {
      setIsModalOpen(false);
    };

  const dispatch = useDispatch();
  useEffect(()=>{dispatch(getBlogs())},[])

  const state = useSelector((state)=>state.blog.blogs)

  const dataSource = Array.from({
    length: state.length,
  }).map((_, i) => ({
    key: i + 1,
    name: state[i].title ,
    category: state[i].category,
    des: state[i].description,

    action:(
      <>
      <Link to={`/admin/Blog/${state[i]._id}`}><AiFillEdit /></Link>
      <button className='border-0 bg-transparent ' onClick={()=>showModal(state[i]._id)} ><AiFillDelete /></button>
      </>
  
    )

    
  }));

   const deleteBlogs = (e)=>{
    
    dispatch(deleteBlog(e))
   
    setIsModalOpen(false)
    setTimeout(()=>{
      dispatch(getBlogs());
    },100)
   }
  


 return (
    <div>
       <div className="mt-4">
            <h3 className="mb-4">Blogs</h3>
            <div><Table columns={columns} dataSource={dataSource} /></div>
            <CustomModal 
          hideModal={hideModal} 
           open={isModalOpen}
           preformAction={()=>deleteBlogs(BlogId)}
           title="Are you sure you want to delete this Brand?"/>
           
          </div>
    </div>
  )
}

export default BlogList
