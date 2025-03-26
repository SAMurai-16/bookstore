import React, { useEffect , useState } from 'react'
import { Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands,deleteBrand } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

import { resetState } from '../features/bcategory/bcategorySlice';
import { Modal } from 'antd';
import CustomModal from '../components/CustomModal';
import { getOrders } from '../features/orders/orderSlice';

const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Brands',
      dataIndex: 'brand',
    },
   
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];


const BrandList = () => {
  const [brandId,setBrandId] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e) => {
    setIsModalOpen(true);
    setBrandId(e)
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getOrders())
    dispatch(getBrands())
  },[])

  const state = useSelector((state)=>state.brand.brands)



  const dataSource = Array.from({
    length: state.length,
  }).map((_, i) => ({
    key: i+1,
    brand: state[i].title,
    action:(
      <>
      <Link to={`/admin/Brand/${state[i]._id}`}><AiFillEdit /></Link>
      <button className='border-0 bg-transparent ' onClick={()=>showModal(state[i]._id)}><AiFillDelete/></button>
      </>
  
    )
    

    
  }));


 const deleteBrands = (e)=>{
  
  dispatch(deleteBrand(e))
 
  setIsModalOpen(false)
  setTimeout(()=>{
    dispatch(getBrands());
  },100)
 }

  return (
     <div>
        <div className="mt-4">
             <h3 className="mb-4">Brands</h3>
             <div><Table columns={columns} dataSource={dataSource} />
             </div>
             <CustomModal 
          hideModal={hideModal} 
           open={isModalOpen}
           preformAction={()=>deleteBrands(brandId)}
           title="Are you sure you want to delete this Brand?"/>
           </div>

          
     </div>
   )
 }
export default BrandList
