import React from 'react'
import CustomInput from './CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from "formik"
import * as yup from 'yup';
import {useDispatch} from "react-redux"
import { registerUser } from '../features/user/userSlice';
import { Helmet } from "react-helmet";
import Breadcrumb from "./breadcrumb";
import Meta from "../components/meta";


let signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup.string().nullable().email("Email should be Valid"),
  mobile:yup.string().required("Mobile Number Required"),
  password:yup.string().required("password is required")
});



const SignUp = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
      email: '',
      mobile:"",
      password:""

    },
    validationSchema:signUpSchema, 
    onSubmit: (values) => {
     dispatch(registerUser(values))
     navigate("/login")
    },
  });
  return (

    
    <>
      <Helmet>
                        <Meta title="Sign Up" />
                        <Meta charSet="utf-8" />
                        <title>Sign Up</title>
        </Helmet>

    <div className="signup-wrapper py-5 home-wrapper-2">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <div>
                <h3 className='text-center mb-3'>Sign Up</h3>
              </div>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-30">

                <CustomInput type="text" placeholder="FirstName" name="firstname" value={formik.values.firstname} 
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}/>

                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                <CustomInput type="text" placeholder="Last Name" name="lastname"  value={formik.values.lastname} 
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
                 />
                   <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                
                <CustomInput type="email" placeholder="Email" name="email"  value={formik.values.email} 
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")} />  
                <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              
                <CustomInput type="text" placeholder="Mobile Number" name="mobile"  value={formik.values.mobile} 
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")} />
                  <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                
                <CustomInput type="password" placeholder="Password" name="password"  value={formik.values.password} 
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")} />
                  <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                
                
                <div className="d-flex justify-content-center mt-3">
                  <button className="button signup">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
   
  )
}

export default SignUp
