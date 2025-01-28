import React from 'react'
import { Button, Flex, Table } from 'antd';

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
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const dataSource = Array.from({
    length: 46,
  }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  }));
  

const Enquiries = () => {
  return (
    <div>
       <div className="mt-4">
            <h3 className="mb-4">Enquiries</h3>
            <div><Table columns={columns} dataSource={dataSource} /></div>
          </div>
    </div>
  )
}

export default Enquiries
