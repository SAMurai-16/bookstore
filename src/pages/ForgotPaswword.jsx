import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import { Link } from 'react-router-dom'

const ForgotPaswword = () => {
  return (
    <>
    <Meta title={"forgot-password"}/>
    <Breadcrumb title="forgot-password"/>
     <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                    <div>
                        <h3 className='text-center mb-3'>Reset Your Password</h3>
                    </div>
                    <div>
                        <h6 className='text-center mb-3'>
                            we will send you an email to reset your password

                        </h6>
                    </div>
                    <form action="" className="d-flex flex-column gap-30">
                        <div>
                            <input 
                            type="email"
                            placeholder='Email'
                            className='form-control'
                            name='Email' />

                        </div>
                       
                        <div className="d-flex justify-content-center gap-30">
                            <Link className="button">Submit</Link>
                            
                        </div>
                        <div>
                        <Link to="/login"className="cancel
                        d-flex justify-content-center">Cancel</Link>
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

export default ForgotPaswword
