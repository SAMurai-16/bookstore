import React, { useEffect } from 'react'
import { FiArrowUpLeft } from "react-icons/fi";
import { GoArrowDownRight } from "react-icons/go";
import { Column } from '@ant-design/plots';
import { Button, Flex, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { resetState } from '../features/bcategory/bcategorySlice';







const dashboard = () => {


  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getOrders())



    

  },[])

useEffect(()=>{})
const total = [];

const allMonths = [
  '1', '2', '3', '4', '5', '6',
  '7', '8', '9', '10', '11', '12'
];
 
  const OrderState  = useSelector((state)=>state.auth.orders);
  
  
  const date = OrderState.map( (_,i)=>  new Date(OrderState[i].createdAt).toLocaleString())

  const month = date.map((_,i)=> date[i].split(",")[0].split("/")[1])

  const amount = OrderState.map( (_,i)=>  OrderState[i].paymentIntent.amount)
 
  for (let i = 0; i < month.length; i++) {
    total.push({ month: month[i], value: amount[i] });
  }
  console.log(total);

  const groupedTotals = total.reduce((acc, item) => {
    acc[item.month] = (acc[item.month] || 0) + item.value;
    return acc;
  }, {});
  
  // Fill missing months with value 0
  const data = allMonths.map(month => ({
  month,
  value: groupedTotals[month] || 0
}));



  
  
  
  
  

  
  
  const config = {
    data,
    xField: 'month',
    yField: 'value',
    style: {
      fill: ({ month }) => {
        if (month === '1' || month === '30+分') {
          return '#22CBCC';
        }
        return '#2989FF';
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return (
    <div>
    <h3 className='mb-4'>Dashboard</h3>
    <div className='d-flex justify-content-between align-items-center gap-3'>
      <div className='d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end'>
        <div><p>total</p> <h4>$100</h4></div>
        <div className='d-flex
        flex-column justify-content-end'>
          <h6><FiArrowUpLeft />32%</h6>
          <p>compared to april</p>
        </div>
        </div>
        
        <div className='d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end'>
        <div><p>total</p> <h4>$100</h4></div>
        <div className='d-flex
        flex-column justify-content-end'>
          <h6><GoArrowDownRight />32%</h6>
          <p>compared to april</p>
        </div>
        </div>
        <div className='d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end'>
        <div><p>total</p> <h4>$100</h4></div>
        <div className='d-flex
        flex-column justify-content-end'>
          <h6><FiArrowUpLeft />32%</h6>
          <p>compared to april</p>
        </div>
        </div>
    
    </div>

    <div className="mt-4">
      <h3 className="mb-4">Income Statistics</h3>
      <div><Column {...config} /></div>
    </div>
    <div className="mt-4">
      <h3 className="mb-4"></h3>
     
    </div>
    </div>
  )
}

export default dashboard
