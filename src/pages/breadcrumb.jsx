import React from 'react'
import { Link } from 'react-router-dom'

const breadcrumb = (props) => {
    const { title }  =props;
  return (
    <section className='breadcrumb py-4'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center">
                   <p className='align-items-center'><Link  to="/" className='text-dark'>
                   Home</Link>
                   /{title}
                   </p> 
                </div>
            </div>
        </div>
      
    </section>
  )
}

export default breadcrumb
