import React from 'react'
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import BlogCard from './BlogCard';
import Productcart from './Productcart';

const Home = () => {
  return (
    <>
    <section className='home-wrapper-1 py-5'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-6">
                    <div className='main-banner position-relative p-3'>
                        <img 
                        src="images/main-banner-1.jpg" 
                        className="img-fluid rounded" alt="main-banner" />
                        <div className='main-banner-content position-absolute'>
                            <h4>Supercharged for pros</h4>
                            <h5>iPad s13+ Pro</h5>
                            <p>From 18,999 or 499/mo.</p>
                            <Link className='button'>BUY NOW</Link>

                        </div>

                    </div>

                </div>
                <div className="col-6">
                    <div className="d-flex flex-wrap justify-content-between align-items-center ">
                    <div className='small-banner position-relative p-3'>
                        <img 
                        src="images/catbanner-01.jpg" 
                        className="img-fluid rounded" alt="Responsive image" />
                        <div className='small-banner-content position-absolute'>
                            <h4>Supercharged for pros</h4>
                            <h5>iPad s13+ Pro</h5>
                            <p>From 18,999<br/> or 499/mo.</p>
                            

                        </div>

                    </div>
                    <div className='small-banner position-relative p-3'>
                        <img 
                        src="images/catbanner-02.jpg" 
                        className="img-fluid rounded" alt="Responsive image" />
                        <div className='small-banner-content position-absolute'>
                            <h4>Supercharged for pros</h4>
                            <h5>iPad s13+ Pro</h5>
                            <p>From 18,999<br/>  or 499/mo.</p>
                            

                        </div>

                    </div>
                    <div className='small-banner position-relative p-3'>
                        <img 
                        src="images/catbanner-03.jpg" 
                        className="img-fluid rounded" alt="Responsive image" />
                        <div className='small-banner-content position-absolute'>
                            <h4>Supercharged for pros</h4>
                            <h5>iPad s13+ Pro</h5>
                            <p>From 18,999<br/>  or 499/mo.</p>
                            

                        </div>

                    </div>
                    <div className='small-banner position-relative p-3'>
                        <img 
                        src="images/catbanner-04.jpg" 
                        className="img-fluid rounded" alt="Responsive image" />
                        <div className='small-banner-content position-absolute'>
                            <h4>Supercharged for pros</h4>
                            <h5>iPad s13+ Pro</h5>
                            <p>From 18,999 <br/> or 499/mo.</p>
                           

                        </div>

                    </div>

                    </div>
                </div>
            </div>
        </div>

    </section>
    <section className='home-wrapper-2 py-5'>
        <div className="container-xl">
            <div className="row">
                <div className="col-12">
                    <div className="services d-flex align-items-center justify-content-between">
                        <div className='d-flex align-items-center gap-10'>
                            <img src="images/service.png" alt="services" />
                            <div>
                                <h6>
                                    Free Shipping
                                </h6>
                                <p className='mb-0'>For all orders over Rs 500</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img src="images/service-02.png" alt="services" />
                            <div>
                                <h6>Daily Suprise Offers</h6>
                                <p className='mb-0'>Save upto 25% off</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img src="images/service-03.png" alt="services" />
                            <div>
                                <h6>Support 24/7</h6>
                                <p className='mb-0'>Shop with an expert</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img src="images/service-04.png" alt="services" />
                            <div>
                                <h6>Affordable Prices</h6>
                                <p className='mb-0'>Get Factory Default Price</p>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-10'>
                            <img src="images/service-05.png" alt="services" />
                            <div>
                                <h6>Secure Payments</h6>
                                <p className='mb-0'>100% Protectd Payment</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <section className="home-wrapper-2 py-5">
        <div className="container-xl">
            <div className="row">
                <div className="col-12">
                    <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Cameras
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Smart TV
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/tv.jpg" alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Headphones
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/headphone.jpg" 
                            className='img-fluid'
                            alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Music & Gaming
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Cameras
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/camera.jpg" alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Smart TV
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/tv.jpg" alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Smart TV
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/tv.jpg" alt="camera" />
                        </div>
                        <div className='d-flex align-items-center gap-30 '>
                            <div className="">
                                <h6>
                                    Smart TV
                                </h6>
                                <p>
                                    10 Items
                                </p>
                            </div>
                            <img src="images/tv.jpg" alt="camera" />
                        </div>
                        
                        

                    </div>
                </div>
            </div>
        </div>
    </section>
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
    <section className="marque-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="marque-inner-wrapper card-wrapper">
                        <Marquee className='d-flex'>
                            <div className="mx-4 w-25">
                                <img src="images/brand-01.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-02.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-03.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-04.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-05.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-06.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-07.png" alt="" />
                            </div>
                            <div className="mx-4 w-25">
                                <img src="images/brand-08.png" alt="" />
                            </div>
                            

                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section className="blog-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h3 className='section-heading mb-50'>
                        Our Latest Blogs

                    </h3>
                </div>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
              <BlogCard/>
            </div>
        </div>
    </section>
    </>
  )
}

export default Home;
