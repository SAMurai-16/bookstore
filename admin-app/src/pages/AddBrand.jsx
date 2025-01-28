
import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Custominput from "../components/CustomInput"
import { createBrands, getBrand, updateBrand } from '../features/brand/brandSlice';
import { resetState } from '../features/bcategory/bcategorySlice';



const AddBrand = () => {
    const navigate = useNavigate()
    const state = useSelector((state)=>state.brand)

    const {isSuccess,isError,isLoading, created,Brandname,updatedBrand2}= state
    const dispatch = useDispatch()
    const location = useLocation();
    const getBrandId = location.pathname.split('/')[3]
  
    
    const formik = useFormik({
            initialValues: {
              
              title: '',
             
            },

            validationSchema: Yup.object({
                      title: Yup.string()
                        .required('Title is Required')
         }),
         onSubmit: async (values) => {
                   try {
                    if(getBrandId!==undefined){
                      const data = {id:getBrandId, brandData:values}
                      dispatch(updateBrand(data))


                    }
                    else{
                      dispatch(createBrands(values));}
                      formik.resetForm()
                      setTimeout(()=>{
                        dispatch(resetState())
                       navigate("/admin/Brand-list")
                      },300)
                      
                   } catch (error) {
                     console.error('Error submitting form:', error);
                   }
                 },
        });


        useEffect(()=>{

          if(getBrandId!== undefined){
            dispatch(getBrand(getBrandId));
            
          }
          else{
            dispatch(resetState())
          }
    
        },[getBrandId])
        

  
              useEffect(()=>{
                if(isSuccess && created){
                  toast.success('Brand Added Successfully!');
                  
                }
                if(isError){
                  toast.error('Something Went Wrong!');
        
                }
                if(isSuccess && updatedBrand2 !== undefined){
                  toast.success('Brand Updated Successfully!');
                  
                }
              },
            [isSuccess,isError,isLoading])




  return (
    <div style={{ backgroundColor: "white", padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{getBrandId!==undefined?"Edit":"Add"} Brand</h2>
      
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Product Name */}
        <Custominput 
          label="Enter a Brand" 
          name="title"
          placeholder="Enter product name" 
          onCh={formik.handleChange('title')}
          val={formik.values.title}
          type='text'
         
        />

<div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.title && formik.errors.title
            }
        </div>
        


        {/* Submit Button */}
        <button 
          type="submit"
          style={{ 
            backgroundColor: '#000', 
            color: '#fff', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            display: 'block', 
            margin: '0 auto'
          }}
        >
          {getBrandId!==undefined?"Edit":"Add"} Product
        </button>
      </form>
    </div>
  )
}

export default AddBrand
