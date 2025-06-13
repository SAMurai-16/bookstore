import React, { useEffect, useState } from 'react'
import Custominput from "../components/CustomInput"
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import Dropzone from 'react-dropzone'
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProduct } from '../features/product/productSlice';
import {data, useLocation, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { getBlogCats, resetState } from '../features/bcategory/bcategorySlice';
import { createBlog, getaBlog, updateBlog } from '../features/blog/blogSlice';

const AddBlog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

      const location = useLocation()
      const getBlogId = location.pathname.split("/")[3]

      
      useEffect(()=>{
        if(getBlogId!==undefined){
          dispatch(getaBlog(getBlogId))

        }
        else{
          dispatch(resetState())
        }
      },[])
      useEffect(()=>{
        dispatch(resetState())
        dispatch(getBlogCats())
      },[])

      const bCategoryState = useSelector((state)=>state.bcategory.bcategory)
      const ImgState = useSelector((state)=>state.image.images)
      const BlogState = useSelector((state)=>state.blog)
      const singleBlog = useSelector((state)=>
       state.blog
      )

      
      const {isSuccess,isError,isLoading,blogCreated,BlogName,BlogDesc,BlogCat,BlogImg}= BlogState


      


      

      const formik = useFormik({
            
            initialValues: {
              title:singleBlog?.BlogName||'',
              description:singleBlog?.BlogDesc ||'',
              category:singleBlog?.BlogCat||'',
              images:singleBlog?.images||''
            },
            validationSchema: Yup.object({
              title: Yup.string()
                .required('Title is Required'),
              description: Yup.string()
                .required('Description is Required'),
              category: Yup.string().required("Category is required"),
              
    
            }),
            onSubmit: async (values) => {
              try {
                if(getBlogId!==undefined){
                  const data = { id: getBlogId , ProductData: values}
                  dispatch(updateBlog(data))
                  dispatch(resetState())


                }
                else{

                  dispatch(createBlog(values));

                }
                 
                 formik.resetForm()
                 setTimeout(()=>{
                  navigate("/admin/blog-list")
                 },300)
                 
              } catch (error) {
                console.error('Error submitting form:', error);
              }
            },
          });



useEffect(() => {
  if (getBlogId !== undefined) {
    formik.setValues({
      title: singleBlog.BlogName || '',
      description: singleBlog.BlogDesc || '',
      category: singleBlog.BlogCat || '',
      images: singleBlog.images || ''
    });
  }
}, [singleBlog.BlogName]); 



           
                  useEffect(()=>{
                         if(isSuccess && blogCreated){
                           toast.success('Product Added Successfully!');
                           
                         }
                         if(isError){
                           toast.error('Something Went Wrong!');
                 
                         }
                       },
                     [isSuccess,isError,isLoading])


                

                       const img = [];
                       ImgState.forEach((i)=>{
                         img.push({
                           imgId: i.imgId,
                           url: i.url
                         })
                 
                       }
                     )
useEffect(() => {
  formik.setFieldValue("images", img);
}, [ImgState]);

                 


  return (
    <div style={{ backgroundColor: "white", padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{getBlogId!==undefined?"Edit":"Add"} Blog</h2>
      
      <form onSubmit={formik.handleSubmit}style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Product Title */}
        <Custominput 
          label="Product Name" 
          name="title"
          placeholder="Enter product name" 
          onCh={formik.handleChange('title')}
          type="text" 
          val={formik.values.title}
          
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.title && formik.errors.title
            }
        </div>

        

        {/* Product Description*/}
        <Custominput 
          label="Desciption"
          name="description" 
          onCh={formik.handleChange('description')}
          type="text" 
          val={formik.values.description}
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.price && formik.errors.price
            }
        </div>

        {/* Category Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Select Category</label>
          <select name="category"
          onChange={formik.handleChange("category")}
          type="text" 
          value = {formik.values.category}
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
            <option value="">Choose a category</option>
            {bCategoryState.map((i,j)=>{
                return (
                    <option value={i.title} key={j}>{i.title}</option>
                )
            })}
          </select>
        </div>

        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.category && formik.errors.category
            }
        </div>

        {/*DropZone*/}
            <div className='bg-white border mb-3 p-5 text-center'>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
</Dropzone>
            </div>
            <div className="show-images d-flex flex-wrap gap-3 ">
              {ImgState.map((i,j)=>{
                return(
                  <div className="position-relative d-flex " key={j}>
                    <button onClick={(e)=> {
                      e.preventDefault()
                      dispatch(delImg(i.imgId))}}  className='btn-close position-absolute'
                    style={{top:"4px",left:"4px"}}>
                    </button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                )

              })}
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
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddBlog
