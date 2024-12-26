import React from 'react'

const CustomInput = (props) => {
    const {type,placeholder,className,name}=props
  return (
    <div>
    <input 
    type={type}
    placeholder={placeholder}
    className={`form-control ${className}`}
    name={name} />

</div>
  )
}

export default CustomInput
