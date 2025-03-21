import React, { useState ,useMemo} from "react";
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ratings } from "../features/product/productSlice";

const Review = () => {
    
    const ratingState = useSelector(state=>state?.prod?.singleproduct?.ratings)
    const getUserId = useSelector(state=>state.auth.user._id)
     const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
      const getProdId = useMemo(() => location.pathname.split('/')[2], [location]);

      const existingReview = ratingState?.find(item => item?.postedby?._id === getUserId);
     const formik = useFormik({
          
          initialValues: {
              
            rating: '',
            description:'',
            
          },
            validationSchema: Yup.object({
              rating: Yup.number()
                .required('Rating is Required'),
              description: Yup.string()
                .required('Description is Required'),
    
            }),
            onSubmit: async (values) => {
              try {
                console.log(values);
                
                dispatch(ratings({prodId:getProdId,star:values.rating,comment    :values.description}))
                 
                 formik.resetForm()
                 setTimeout(()=>{
                  navigate(`/product/${getProdId}`)
                 },300)
                 
              } catch (error) {
                console.error('Error submitting form:', error);
              }
            },
          });
    
          

  return (
    <div className="container  text-center mx-auto p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>

      <form onSubmit={formik.handleSubmit}style={{ maxWidth: '500px', margin: '0 auto' }}>



                {/* Category Selection */}
                <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Select Rating</label>
          <select name="rating"
          onChange={formik.handleChange("rating")}
          type="number" 
          value = {formik.values.category}
          style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
            <option value="">Choose a rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
           
          </select>
        </div>

        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.rating && formik.errors.rating
            }
        </div>

        {/* Product Name */}
        <input 
        className="w-100"
         
          onChange={formik.handleChange("description")}
          type="text" 
          value= {formik.values.description}
        />
        <div className="error mb-3 mt-0 text-danger">
            {
                formik.touched.description && formik.errors.description
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
            {existingReview ? "Edit Review" : "Add Review"}
        
        </button>
      </form>
    </div>
  );
};

export default Review;
