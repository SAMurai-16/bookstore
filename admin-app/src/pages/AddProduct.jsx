import React, { useEffect, useState } from 'react'
import Custominput from "../components/CustomInput"
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/category/categorySlice';
import { resetUploadState } from '../features/upload/uploadSlice';
import Dropzone from 'react-dropzone'
import { delImg, delpdf, uploadImg, uploadpdf } from '../features/upload/uploadSlice';
import { createProduct, getaProduct, updateProduct } from '../features/product/productSlice';
import {useLocation, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { resetState } from '../features/bcategory/bcategorySlice';



const AddProduct = () => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
     const location = useLocation();
     const getProductId = location.pathname.split("/")[3]

           useEffect(()=>{
             if(getProductId!==undefined){
               dispatch(getaProduct(getProductId))
     
             }
             else{
               dispatch(resetState())
             }
           },[])


           const Prod = useSelector((state)=>state.product.getProduct)



    

     const formik = useFormik({
    
      
initialValues: {
  title: Prod?.title || '',
  description: Prod?.description || '',
  price: Prod?.price || '',
  brand: Prod?.brand || '',
  category: Prod?.category || '',
  quantity: 1 || '',
  images: Prod?.images[0]?.url || [],
  tag: Prod?.tag || '',
  files: Prod?.files || [],
}
,
        validationSchema: Yup.object({
          title: Yup.string()
            .required('Title is Required'),
          description: Yup.string()
            .required('Description is Required'),
          price: Yup.number()
          .required('Price is Required'),
          brand: Yup.string().required("brand is required"),
          category: Yup.string().required("Category is required"),
          quantity:Yup.number().required("Quantity is Required")

        }),
        onSubmit: async (values) => {
          try {
            if(getProductId!==undefined){
              const data = {id:getProductId , ProductData : values}
              dispatch(updateProduct(data))
              
              
              dispatch(resetUploadState());
            }
            else{

              dispatch(createProduct(values));
              dispatch(resetUploadState());

            }
             
             formik.resetForm()
             setTimeout(()=>{
              navigate("/admin/Product-list")
             },300)
             
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        },
      });

      const Brandstate = useSelector((state)=>state.brand.brands)
      const categoryState = useSelector((state)=>state.category.categories)
      const ImgState = useSelector((state)=>state.image.images)
      const pdfState = useSelector((state)=>state.image.files)
      const createdProduct = useSelector((state)=>state.product)




      useEffect(() => {
  if (getProductId !== undefined && Prod?._id) {
    formik.setValues({
      title: Prod.title || '',
      description: Prod.description || '',
      price: Prod.price || '',
      brand: Prod.brand || '',
      category: Prod.category || '',
      quantity: Prod.quantity || 1,
      images: Prod.images || [],
      tag: Prod.tag || '',
      files: Prod.files || [],
    });
  }
}, [Prod]);



      const {isSuccess,isError,isLoading}= createdProduct
      useEffect(()=>{
        if(isSuccess){
          toast.success('Product Added Successfully!');
          
        }
        if(isError){
          toast.error('Something Went Wrong!');

        }
      },
    [isSuccess,isError,isLoading])


      const img = [];
      ImgState?.forEach((i)=>{
        img.push({
          imgId: i.imgId,
          url: i.url
        })

      }
    )
    const file = [];
    pdfState?.forEach((i)=>{
      file.push({
        imgId: i.imgId,
        url: i.url
      })

    }
  )

      const [images,Setimages] = useState([])
      useEffect(()=>{dispatch(getBrands())},[])
      useEffect(()=>{dispatch(getCategories())},[])
      useEffect(()=>{
        formik.values.images = img
        formik.values.files = file

      },[img,file])


      
        
      

      
    
  return (
    <div style={{ backgroundColor: "white", padding: '20px', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Product</h2>
      
      <form onSubmit={formik.handleSubmit}style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Product Name */}
        <Custominput 
          label="Product Name" 
          name="title"
          placeholder="Enter product name" 
          onCh={formik.handleChange}
          type="text" 
          val= {formik.values.title}
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.title && formik.errors.title
            }
        </div>

        {/* Product Title */}
        <Custominput 
          label="Product Description" 
          placeholder="Enter product Description" 
          name="description"
          onCh={formik.handleChange}
          type="text" 
          val = {formik.values.description}
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.description && formik.errors.description
            }
        </div>

        {/* Product Price */}
        <Custominput 
          label="Product Price"
          name="price" 
          placeholder="Enter product price" 
          onCh={formik.handleChange('price')}
          type="number" 
          val={formik.values.price}
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.price && formik.errors.price
            }
        </div>
        <Custominput 
          label="Product Tag"
          name="price" 
          placeholder="Enter product tag" 
          onCh={formik.handleChange('tag')}
          type="text" 
          val={formik.values.tag}
        />
    

        {/* Brand Selection */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Select Brand</label>
          <select name="brand"
          onChange={formik.handleChange("brand")}
          type="text" 
          value = {formik.values.brand}
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
            <option value="">Choose a brand</option>
            {Brandstate.map((i,j)=>{
                return (
                    <option value={i.title} key={j}>{i.title}</option>
                )
            })}
          </select>
        </div>
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.brand && formik.errors.brand
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
            {categoryState.map((i,j)=>{
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


        
        {/* Product Quantity */}
        <Custominput 
          label="Quantity"
          name="price" 
          placeholder="Enter Quantity" 
          onCh={formik.handleChange('quantity')}
          type="number" 
          val={formik.values.quantity}
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.quantity && formik.errors.quantity
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
              {ImgState?.map((i,j)=>{
                return(
                  <div className="position-relative d-flex " key={j}>
                    <button onClick={(e)=> {
                      e.preventDefault()

                      dispatch(delImg(i.imgId))} 

                    }
                     className='btn-close position-absolute'
                    style={{top:"4px",left:"4px"}}>
                    </button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                )

              })}
            </div>


            <div>
        {/*DropZone*/}
            <div className='bg-white border mb-3 p-5 text-center'>
            <Dropzone onDrop={(acceptedFiles) => dispatch(uploadpdf(acceptedFiles))}>
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

      {/* PDF Previews */}
      <div className="show-pdfs d-flex flex-wrap gap-3">
        {pdfState?.map((pdf, index) => (
          <div className="position-relative d-flex align-items-center" key={index}>
            <button
              onClick={(e) => {
                e.preventDefault()
                dispatch(delpdf(pdf.id))}}
              className="btn-close position-absolute"
              style={{ top: "4px", left: "4px" }}
            ></button>
            <a href={pdf.url} target="_blank" rel="noopener noreferrer">
              📄 {pdf.name || `PDF ${index + 1}`}
            </a>
          </div>
        ))}
      </div>
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
  );
}

export default AddProduct
