import React, { useEffect } from 'react'
import { Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getusers } from '../features/customers/customerSlice';

const columns = [
    {
      title: 'S No.',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      defaultSortOrder : "descend",
      sorter: (a,b)=> a.name.length - b.name.length 
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
  ];
 

const Customers = () => {
  const dispatch  = useDispatch();
  useEffect(()=>{
    dispatch(getusers())

    
  },[]);
  const state  = useSelector((state)=>state.customer.customers)
  const {data} = state

const data1 =[];
for(let i =0; i< state.length;i++){
  if(state[i].role !="admin"){
    data1.push({
     
    })
  }
}
  const dataSource = Array.from({
    length: state.length,
  }).map((_, i) => ({
    key: i,
    name: state[i].firstname + " " + state[i].lastname ,
    email: state[i].email,
    mobile: state[i].mobile

    
  }));
  
  

  return (
      <div>
         <div className="mt-4">
              <h3 className="mb-4">Customers</h3>
              <div><Table columns={columns} dataSource={dataSource} /></div>
            </div>
      </div>
    )
  }
  

export default Customers
