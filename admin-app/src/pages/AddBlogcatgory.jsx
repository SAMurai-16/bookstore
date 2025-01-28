
import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Custominput from "../components/CustomInput"
import { createBrands } from '../features/brand/brandSlice';
import { createBcategories, getBcategory, resetState, updateBcategory } from '../features/bcategory/bcategorySlice';


const AddBrand = () => {
    const location = useLocation();
    const getBlogCatId = location.pathname.split("/")[3] 
    const navigate = useNavigate()
    const dispatch = useDispatch()


        useEffect(()=>{
        
              if(getBlogCatId!== undefined){
                dispatch(getBcategory(getBlogCatId))
                
        
        
              }
              else{
                dispatch(resetState())
              }
        
            },[getBlogCatId])
     
        
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
                     if(getBlogCatId!==undefined){
                      const data = 
                      {id:getBlogCatId,
                      Blogcat:values

                      }
                      dispatch(updateBcategory(data))

                     }
                     else{
                      dispatch(createBcategories(values));
                     }


                      formik.resetForm()

                      setTimeout(()=>{
                        dispatch(resetState())
                       navigate("/admin/Blog-category-list")
                      },300)
                      
                   } catch (error) {
                     console.error('Error submitting form:', error);
                   }
                 },
        });
        

        const state = useSelector((state)=>state.bcategory)

         const {isSuccess,isError,isLoading,created}= state

        useEffect(()=>{
                if(isSuccess && created){
                  toast.success('Product Added Successfully!');
                  
                }
                if(isError){
                  toast.error('Something Went Wrong!');
        
                }
              },
            [isSuccess,isError,isLoading])




  return (
    <div style={{ backgroundColor: "white", padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{getBlogCatId!==undefined?"Edit":"Add"} Blog Category</h2>
      
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Product Name */}
        <Custominput 
          label="Enter a Category" 
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
          {getBlogCatId!==undefined?"Edit":"Add"}  Product
        </button>
      </form>
    </div>
  )
}

export default AddBrand
