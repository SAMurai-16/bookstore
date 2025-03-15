import React from 'react'

const CustomInput = (props) => {
    const {type,placeholder,className,name,value,onChange,onBlur}=props
  return (
    <div>
    <input 
    type={type}
    placeholder={placeholder}
    className={`form-control ${className}`}
    name={name} 
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    />

</div>
  )
}

export default CustomInput
