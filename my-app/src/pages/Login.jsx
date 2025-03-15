import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import { Link } from 'react-router-dom'
import CustomInput from './CustomInput'
import {useFormik} from "formik"
import * as yup from 'yup';
import {useDispatch} from "react-redux"
import { loginUser } from '../features/user/userSlice';



let loginUpSchema = yup.object({
  email: yup.string().nullable().email("Email should be Valid"),
  password:yup.string().required("password is required")
});

const Login = () => {
    const dispatch = useDispatch();
    
      const formik = useFormik({
        initialValues: {
          email:"",
          password:""
    
        },
        validationSchema:loginUpSchema, 
        onSubmit: (values) => {
         dispatch(loginUser(values))
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
