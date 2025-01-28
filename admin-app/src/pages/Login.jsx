import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import {login} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const formik = useFormik({
    initialValues: {
      
      email: '',
      password:'',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email Address')
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      dispatch(login(values))
      alert(JSON.stringify(values, null, 2));
    },
  });
  const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)
  
  
  useEffect(()=>{
    if(!user== null || isSuccess){
      navigate("admin")
    }
    else{
      navigate("")
    }
  },[user,isLoading,isError,isSuccess,message])
  return (
    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
    <div className="back justify-content-center align-items-center" style={{background: "#ffd333",minHeight:"100vh"}}>

        <div className='box my-5  bg-white rounded-3 mx-auto p-3'>
            <h3 className='text-center'>Login</h3>
            <div className='error text-center'>
              {message.message == "Rejected"?"you are not an admin":""}
            </div>

            <form action="" onSubmit={formik.handleSubmit}>

                <CustomInput type="text" name="email" placeholder="Email adrress" id="email"
                
                onCh={formik.handleChange('email')}
                val={formik.values.email}/>
              {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
              ) : null}
  


                <CustomInput type="password" name="password" placeholder="Password" id="pass"
                onCh={formik.handleChange('password')}
                val={formik.values.password}/>

              {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
              ) : null}
                <button 
                className='border-0 px-3 mt-5 bg-red'
                type="submit">
                    Login
                </button>
            </form>
            
        </div>

        </div>
    </div>
    </div> 
    </div> 
  )
}

export default Login
