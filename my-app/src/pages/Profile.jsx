import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Meta from "../components/meta";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

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
      dispatch(updateUser(values));
      alert('Profile Updated Successfully!');
      setEdit(false);
    },
  });

  return (
    <>
      <Helmet>
        <Meta title="Profile" />
        <Meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>

      <div style={{
        backgroundColor: '#fafafa',
        padding: '40px 20px',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', sans-serif",
        color: '#333'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#f2f2f2',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '25px',
            fontWeight: '600'
          }}>
            Your Profile
          </h2>

          {/* Edit Button */}
          <div className="text-center mb-4">
            {!edit ? (
              <button
                className="btn"
                onClick={() => setEdit(true)}
                style={{
                  backgroundColor: '#FFA500',
                  border: 'none',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '8px'
                }}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => setEdit(false)}
                style={{
                  backgroundColor: '#ccc',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px'
                }}
              >
                Cancel
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            {['firstname', 'lastname', 'mobile', 'email'].map((field, i) => (
              <div className="mb-3" key={i}>
                <label className="form-label" style={{ fontWeight: '500', marginBottom: '6px' }}>
                  {field === 'firstname' ? 'First Name' :
                   field === 'lastname' ? 'Last Name' :
                   field === 'mobile' ? 'Mobile No.' :
                   'Email'}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  className="form-control"
                  placeholder={`Enter ${field}`}
                  onChange={formik.handleChange}
                  value={formik.values[field]}
                  readOnly={!edit}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    padding: '10px',
                    width: '100%',
                    backgroundColor: edit ? '#fff' : '#eee'
                  }}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div className="text-danger" style={{ fontSize: '0.875rem', marginTop: '5px' }}>
                    {formik.errors[field]}
                  </div>
                )}
              </div>
            ))}

            {/* Save Button */}
            {edit && (
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn"
                  style={{
                    backgroundColor: '#FFA500',
                    border: 'none',
                    color: 'white',
                    padding: '10px 25px',
                    borderRadius: '8px'
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {/* Logout */}
          <div className="text-center mt-5">
            <button
              onClick={handleLogout}
              className="btn"
              style={{
                backgroundColor: '#d9534f',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
