import React, { useEffect } from 'react'
import { Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/orders/orderSlice';



const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Order ID',
      dataIndex: 'order',
    },
    {
      title: 'Buyer Info',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    
    {
      title: 'Amount',
      dataIndex: 'amount',
    },

    {
      title: 'Action',
      dataIndex: 'action',
    },
    
  ];
 
  

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(getOrders())},[])
  const state = useSelector((state)=>state?.orders?.orders)
  console.log(state);
  

  const dataSource = Array.from({
    length: state.length,
  }).map((_, i) => ({
    key: i,
    name: state[i].user?.firstname + " " + state[i].user?.lastname  ,
    order: state[i]._id ,
    product: state[i].orderItems.map((i,j)=>{
      return( 
        
        <ul key={j}>
          <p>{i.product?.title}</p>
          
          </ul>
          
      )
    }),
    
    amount: state[i].totalPrice,
    date:new Date(state[i].createdAt).toLocaleString()

    
  }));

   return (
      <div>
         <div className="mt-4">
              <h3 className="mb-4">Orders</h3>
              <div><Table columns={columns} dataSource={dataSource} /></div>
            </div>
      </div>
    )
  }

export default Orders
