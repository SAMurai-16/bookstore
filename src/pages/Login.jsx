import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import { Link } from 'react-router-dom'
import CustomInput from './CustomInput'

const Login = () => {
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
                    <form action="" className="d-flex flex-column gap-30">
                    < CustomInput type="text" placeholder="text" name="Email"/>
                       
                        <div>
                            <input 
                            type="password"
                            placeholder='Password'
                            className='form-control'
                            name='password' />

                        </div>
                        <div>
                            <Link to="/forgot-password"className='forgot'>
                            Forgot Password?</Link>
                        </div>
                        <div className="d-flex justify-content-center gap-30">
                            <Link className="button">Login</Link>
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
