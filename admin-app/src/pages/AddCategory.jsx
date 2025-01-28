import React, {useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Custominput from "../components/CustomInput"
import { createBrands } from '../features/brand/brandSlice';
import { createCategories, getaCategory, updateaCategory } from '../features/category/categorySlice';
import { resetState } from '../features/bcategory/bcategorySlice';


const AddBrand = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const CategoryId = location.pathname.split('/')[3]

    useEffect(()=>{
    
          if(CategoryId!== undefined){
            dispatch(getaCategory(CategoryId))
            
    
    
          }
          else{
            dispatch(resetState())
          }
    
        },[CategoryId])
 
    
    const dispatch = useDispatch()
    const formik = useFormik({
            initialValues: {
              
              title: '',
             
            },

            validationSchema: Yup.object({
                      title: Yup.string()
                        .required('Category is Required')
         }),
         onSubmit: async (values) => {
                   try {
                      if(CategoryId!==undefined){
                                           const data = {id:CategoryId, CategoryData:values}
                                        
                                           
                                           dispatch(updateaCategory(data))
                     
                     
                                         }
                                         else{
                                           dispatch(createCategories(values));}
                                           formik.resetForm()
                                           setTimeout(()=>{
                                             dispatch(resetState())
                                            navigate("/admin/category-list")
                                           },300)
                      
                   } catch (error) {
                     console.error('Error submitting form:', error);
                   }
                 },
        });

         const state = useSelector((state)=>state.category)
        
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{CategoryId!==undefined?"Edit":"Add"} Category</h2>
      
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
          {CategoryId!==undefined?"Edit":"Add"} Category
        </button>
      </form>
    </div>
  )
}

export default AddBrand
