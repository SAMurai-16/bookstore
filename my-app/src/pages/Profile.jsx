import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Breadcrumb from "./breadcrumb";
import Meta from "../components/meta";

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false);

  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/")
    window.location.reload()
   
  }

  // Formik Form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobile: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    }),
    onSubmit: async (values) => {
      dispatch(updateUser(values))

      console.log('Updated Values:', values);
      alert('Profile Updated Successfully!');
      setEdit(false); // Disable edit mode after saving
    },
  });



  return (
    <>
      <Helmet>
                        <Meta title="Profile" />
                        <Meta charSet="utf-8" />
                        <title>Profile</title>
        </Helmet>
    <div style={{ backgroundColor: 'white', padding: '30px', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Profile</h2>

      {/* Edit Button */}
      <div className="text-center mb-3">
        {!edit ? (
          <button className="btn btn-primary" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setEdit(false)}>
            Cancel
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstname"
            className="form-control"
            placeholder="Enter first name"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            readOnly={!edit}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <div className="text-danger">{formik.errors.firstname}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            placeholder="Enter last name"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            readOnly={!edit}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <div className="text-danger">{formik.errors.lastname}</div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="mb-3">
          <label className="form-label">Mobile No.</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            placeholder="Enter mobile number"
            onChange={formik.handleChange}
            value={formik.values.mobile}
            readOnly={!edit}
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <div className="text-danger">{formik.errors.mobile}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
            readOnly={!edit}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        {/* Submit Button */}
        {edit && (
          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Save Changes
            </button>
          </div>
        )}
      </form>
      <div className='text-center mt-10 py-5'>
        <button className="text-white mb-3 btn  "onClick={handleLogout} style={{backgroundColor:"red"}}>Logout</button>
      </div>
    </div>
    </>

  );
};

export default Profile;
