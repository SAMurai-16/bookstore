import React from 'react'
import { Button, Modal } from 'antd';

const CustomModal = (props) => {

    const{open,hideModal,preformAction,title} = props
  return (
    <>
    <Modal title="Basic Modal" 
    okText="Ok"
    cancelText="Cancel"

    open={open} 
    onOk={preformAction} 
    onCancel={hideModal}>
      <p>{title}</p>
    </Modal>
  </>
  )
}

export default CustomModal
