import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import Productcart from './Productcart'
import ImageZoom from "react-image-zooom";
import { Link } from 'react-router-dom';


const SingleProduct = () => {
  return (
    <>
    <Meta title={"Product Name"}/>
    <Breadcrumb title="Product Name"/>
    <div className="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                <div className="main-product-image">  
                    <div>
                         <ImageZoom src="https://wallpaperaccess.com/full/3046105.jpg" alt="A image to apply the ImageZoom plugin" zoom="200" 
                         />
                    </div>
                </div>
                <div className=" d-flex other-product-images flex-wrap gap-15">
                    <div>
                        <img src="https://wallpaperaccess.com/full/3046105.jpg"
                        className='img-fluid' alt="" />
                    </div>
                    <div>
                        <img src="https://wallpaperaccess.com/full/3046105.jpg"
                        className='img-fluid' alt="" />
                    </div>
                    <div>
                        <img src="https://wallpaperaccess.com/full/3046105.jpg"
                        className='img-fluid' alt="" />
                    </div>
                    <div>
                        <img src="https://wallpaperaccess.com/full/3046105.jpg"
                        className='img-fluid' alt="" />
                    </div>

                </div>
                </div>
                <div className="col-6">
                    <div className="main-product-details">
                        <div className="title">
                            <h3>KIds Headphones</h3>
                        </div>
                        <div className="price-rating">
                            <p>Price:Rs 5000</p>
                        </div>
                        <div className="details py-5">
                            <div className="d-flex gap-15">
                                <p className=''>Quantity</p>
                                <input type="number"
                                min={1}
                                max={9} />
                               <div className="d-flex justify-content-center gap-30">
                            <Link className="button">Add to Cart</Link>
                            <Link to="/signup"className="button signup">Buy Now</Link>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section className="featured-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className='section-heading mb-50'>
                        Featured Collection

                    </h3>
                </div>
              <Productcart/>
              <Productcart/>
              <Productcart/>
              <Productcart/>
            </div>
        </div>
    </section>
    </>
  )
}

export default SingleProduct
