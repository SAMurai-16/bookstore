import React, { useEffect , useState } from 'react'
import { Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBcategory, getBlogCats } from '../features/bcategory/bcategorySlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import CustomModal from '../components/CustomModal';
import { AiFillEdit } from "react-icons/ai";
const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Categories',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
  const dataSource = Array.from({
    length: 46,
  }).map((_, i) => ({
    key: i,
    name: `Edwarddd King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  }));
  

const BlogcategoryList = () => {


    const[BlogCatId,SetBlogCatId] = useState("")
  
      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = (e) => {
        setIsModalOpen(true);
        SetBlogCatId(e)
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const hideModal = () => {
        setIsModalOpen(false);
      };

  const dispatch = useDispatch()
  useEffect(()=>{dispatch(getBlogCats())},[])

  const state = useSelector((state)=>state.bcategory.bcategory)

  const deleteBlogCat = (e)=>{
    dispatch(deleteBcategory(e))

     setIsModalOpen(false)
          setTimeout(()=>{
            dispatch(getBlogCats());
          },100)
    

  }

  const dataSource = Array.from({
    length: state.length,
  }).map((_, i) => ({
    key: i + 1,
    name: state[i].title,
    action:(
      <>
      <Link to={`/admin/Blog-Category/${state[i]._id}`}><AiFillEdit /></Link>
      <button className='border-0 bg-transparent ' onClick={()=>showModal(state[i]._id)}><AiFillDelete/></button>
      </>
  
    )

    
  }));

  
   return (
      <div>
         <div className="mt-4">
              <h3 className="mb-4">Blog Categories</h3>
              <div><Table columns={columns} dataSource={dataSource} /></div>
              <CustomModal 
          hideModal={hideModal} 
           open={isModalOpen}
           preformAction={()=>deleteBlogCat(BlogCatId)}
           title="Are you sure you want to delete this Brand?"/>
           
            </div>
      </div>
    )
  }

export default BlogcategoryList
