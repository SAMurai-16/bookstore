import React from 'react';
import Breadcrumb from './breadcrumb';
import Meta from '../components/meta';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { resetPassword } from '../features/user/userSlice';


const resetPasswordSchema = yup.object({
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const token = location.pathname.split("/")[2]
    console.log(token);
     
     // Get reset token from URL

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: resetPasswordSchema, 
        onSubmit: (values) => {
            dispatch(resetPassword({token:token,password:values.password}))

           
            navigate("/login"); // Redirect after password reset
        },
    });

    return (
        <>
            <Meta title={"Reset Password"} />
            <Breadcrumb title="Reset Password" />
            <div className="reset-password-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <div>
                                    <h3 className='text-center mb-3'>Reset Your Password</h3>
                                    <p className="text-center">Enter a new password below.</p>
                                </div>
                                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
                                    {/* New Password */}
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <input 
                                            type="password"
                                            id="password"
                                            placeholder="Enter new password"
                                            className='form-control'
                                            name='password'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required
                                        />
                                        <div className="error">{formik.touched.password && formik.errors.password}</div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="form-group">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input 
                                            type="password"
                                            id="confirmPassword"
                                            placeholder="Confirm new password"
                                            className='form-control'
                                            name='confirmPassword'
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required
                                        />
                                        <div className="error">{formik.touched.confirmPassword && formik.errors.confirmPassword}</div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="d-flex justify-content-center gap-3">
                                        <button type="submit" className="btn btn-primary">Reset Password</button>
                                    </div>

                                    {/* Back to Login */}
                                    <div className="text-center mt-3">
                                        <p>Remembered your password? <a href="/login">Login here</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
