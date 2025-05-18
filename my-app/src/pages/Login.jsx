import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from './CustomInput'
import { Helmet } from "react-helmet";
import {useFormik} from "formik"
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux"
import { loginUser } from '../features/user/userSlice';
import "../index.css"



let loginUpSchema = yup.object({
  email: yup.string().nullable().email("Email should be Valid"),
  password:yup.string().required("password is required")
});

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const authState = useSelector(state=>state.auth)
    
      const formik = useFormik({
        initialValues: {
          email:"",
          password:""
    
        },
        validationSchema:loginUpSchema, 
        onSubmit: (values) => {
         dispatch(loginUser(values))

         setTimeout(()=>{
          if(authState.isSuccess){
            
            

            navigate("/")

          }
         },300)
         
        },
      });





  return (
    
    <>
    <Helmet>
      <Meta title="Login" />
                            <Meta charSet="utf-8" />
                            <title>Login</title>
    <Breadcrumb title="Login"/>
    </Helmet>
   
     <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                    <div>
                        <h3 className='text-center mb-3'>Login</h3>
                    </div>
                    <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-30">
                    < CustomInput type="text" placeholder="text" name="email"
                    value={formik.values.email} 
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}/>
                     <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                       
                        <div>
                            <input 
                            type="password"
                            placeholder='Password'
                            className='form-control'
                            name='password'
                            value={formik.values.password} 
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")} />
                     <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
        

                        </div>
                        <div>
                            <Link to="/forgot-password"className='forgot'>
                            Forgot Password?</Link>
                        </div>
                        <div className="d-flex justify-content-center gap-30">
                            <button className="button">Login</button>
                            <Link to="/signup"className="button signup">SignUp</Link>
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
