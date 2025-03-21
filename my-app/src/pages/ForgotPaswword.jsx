import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from './CustomInput'
import {useFormik} from "formik"
import * as yup from 'yup';
import {useDispatch} from "react-redux"
import { forgotPassword, loginUser } from '../features/user/userSlice';



let loginUpSchema = yup.object({
  email: yup.string().nullable().email("Email should be Valid"),
  
});

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
      const formik = useFormik({
        initialValues: {
          email:"",
          
    
        },
        validationSchema:loginUpSchema, 
        onSubmit: (values) => {
         dispatch(forgotPassword(values))
        
        },
      });





  return (
    
    <>
    <Meta title={"Login"}/>
    <Breadcrumb title="Login"/>
     <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                    <div>
                        <h3 className='text-center mb-3'>Forgot Password</h3>
                    </div>
                    <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-30">
                    < CustomInput type="text" placeholder="email" name="email"
                    value={formik.values.email} 
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}/>
                     <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                       

                        <div className="d-flex justify-content-center gap-30">
                            <button className="button">Submit</button>
                            <Link to="/login"className="button signup">Cancel</Link>
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

export default Login
