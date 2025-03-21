import React, { useEffect,useState} from 'react'
import { Button, Flex, Table } from 'antd';
import { deleteProduct, getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  
const ProductList = () => {
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getProducts())
},[])

const state = useSelector((state)=>state.product.products)




  const [ProductId,setProductId] = useState("")
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e) => {
      setIsModalOpen(true);
      setProductId(e)
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const hideModal = () => {
      setIsModalOpen(false);
    };

  





const dataSource = Array.from({
  length: state.length,
}).map((_, i) => ({
  key: i+1,
  title: state[i].title,
  brand: state[i].brand,
  category: state[i].category,
  tag : state[i].tag,
  price: `$ ${state[i].price}`,

  action:(
    <>
    <Link to={`/admin/Product/${state[i]._id}`}><AiFillEdit /></Link>
    <button className='border-0 bg-transparent ' onClick={()=>(showModal(state[i]._id))}><AiFillDelete/></button>
    </>

  )


}));

const deleteProducts  = (e)=>{
  dispatch(deleteProduct(e))

  setIsModalOpen(false)
  setTimeout(()=>{
    dispatch(getProducts())
  },100)
}




  return (
     <div>
        <div className="mt-4">
             <h3 className="mb-4">Products</h3>
             <div><Table columns={columns} dataSource={dataSource} /></div>
           </div>
           <CustomModal 
          hideModal={hideModal} 
           open={isModalOpen}
           preformAction={()=>deleteProducts(ProductId)}
           title="Are you sure you want to delete this Brand?"/>
     </div>
   )
 }

export default ProductList
