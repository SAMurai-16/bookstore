import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import Productcart from './Productcart';
import { useDispatch, useSelector } from 'react-redux';
import { getallProducts } from '../features/product/productSlice';
import FeaturedCard from "./FeaturedCard"
import BlogCard from './blogCardHome';
import { getallBlogs } from '../features/blog/blogSlice';
import { getUserWishlist } from '../features/user/userSlice';

const Home = () => {
    const dispatch = useDispatch();
   
    useEffect(()=>{
        dispatch(getallProducts())
        dispatch(getallBlogs())
       
       
    },[])
    const prodState = useSelector((state)=>state?.prod?.product)
    const blogState = useSelector(state=>state?.blog?.blog);
  


    

 

  return (
    <>
      {/* Hero Section */}
      <section className="hero-wrapper py-5 px-5">
        <div className="container-xxl">
          <div className="row align-items-center">
            {/* Left Large Banner (50%) */}
            <div className="col-md-6">
              <div className="hero-banner position-relative p-2">
                <img src="images/explore.jpg" className="img-fluid rounded hero-img" alt="main-banner" />
                <div className="hero-overlay"></div>
                <div className="hero-content position-absolute text-white text-center">
                  <h4>Unleash Your Imagination</h4>
                  <h5>Explore Bestsellers & New Arrivals</h5>
                  <p>Starting at ₹199</p>
                  <Link to="/product?tag=BestSelling" className='button'>Shop Now</Link>
                </div>
              </div>
            </div>

            {/* Right Side - 4 Small Banners (50%) */}
            <div className="col-md-6 d-flex flex-wrap">
              {[
                {image:"https://i.pinimg.com/474x/70/38/36/703836f6e7d1c0ef15fb77ce0d629d5f.jpg",link:"/product?category=fiction",name:"FICTION"}
                
                , {image:"https://i.pinimg.com/474x/ee/5c/92/ee5c92e3e49facc751d102cf880ccd07.jpg",link:"/product?category=non-fiction",name:"NON-FICTION"}
                
                , {image:"https://i.pinimg.com/474x/c4/c8/dd/c4c8ddfccae9f1845cfdc6af4781b580.jpg",link:"/product?category=self-help", name:"SELF-HELP"}
                , {image:"https://i.pinimg.com/474x/79/3a/d2/793ad253dace9775c29bb9f4b954f2cb.jpg",link:"/product?category=children", name:"CHILDREN"}].map((category, index) => (
                <div key={index} className="col-6 px-1 py-1">
                  <Link className='w-100' to={category.link}>
                  <div className="small-banner position-relative w-100">
                    <img src={`${category.image}`} className="img-fluid rounded small-banner-img" alt={`Category ${index}`} />
                    <div className="hero-overlay"></div>
                    <div className="small-banner-content position-absolute text-white text-center">
                      <h3 className='text-white'>{category.name}</h3>
                    </div>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className='home-wrapper-2 py-5 px-5'>
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className='d-flex align-items-center gap-10'>
                  
             
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-02.png" alt="services" />
                  <div>
                    <h6>Exclusive Discounts</h6>
                    <p className='mb-0'>Up to 30% off</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-03.png" alt="services" />
                  <div>
                    <h6>24/7 Support</h6>
                    <p className='mb-0'>For all inquiries</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-04.png" alt="services" />
                  <div>
                    <h6>Wide Selection</h6>
                    <p className='mb-0'>Over 50,000 Titles</p>
                  </div>
                </div>
                <div className='d-flex align-items-center gap-10'>
                  <img src="images/service-05.png" alt="services" />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className='mb-0'>100% Safe Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="home-wrapper-2 py-5">
  <div className="container-xl">
    <div className="row">
      <div className="col-12">
        <div className="categories-grid">
          {[
            { name: "Fiction", image: "images/fiction.jpg", count: 120 },
            { name: "Non-Fiction", image: "https://i.pinimg.com/474x/43/e4/d9/43e4d9b6e8fe20f5b5a25f3001084d0e.jpg", count: 80 },
            { name: "Self-Help", image: "https://i.pinimg.com/474x/00/ba/fa/00bafaf945037c8909e7126efb2596a3.jpg", count: 60 },
            { name: "Children's Books", image: "https://i.pinimg.com/474x/7a/66/6c/7a666cbe779b771b2da75dd7d60559ba.jpg", count: 50 }
          ].map((category, index) => (
            <div key={index} className="category-card position-relative">
              <img src={`${category.image}`} className="category-img" alt={category.name} />
              <div className="overlay"></div>
              <div className="category-text">
                <h6>{category.name}</h6>
                <p>{category.count} Titles</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Featured Books Section */}
      <section className="featured-wrapper py-5 home-wrapper-2 px-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className='section-heading mb-50'>Featured Books</h3>
            </div>
        < FeaturedCard data={prodState}/>
          </div>
        </div>
      </section>

      {/* Brands/Publishers Marquee */}
      <section className="marque-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="marque-inner-wrapper card-wrapper">
                <Marquee className='d-flex'>
                  <div className="mx-4 w-25"><img className="img-fluid " src="https://media.list.ly/production/439664/2451852/2451852-penguin-random-house_600px.png?ver=3350349456" alt="Publisher 1" /></div>
                  <div className="mx-4 w-25"><img className="img-fluid " src="https://media.list.ly/production/439664/2451848/2451848-pearson_600px.png?ver=6376087790" alt="Publisher 2" /></div>
                  <div className="mx-4 w-25"><img  className="img-fluid " src="https://media.list.ly/production/439664/2451849/2451849-thomson-reuters_600px.png?ver=8462315609" alt="Publisher 3" /></div>
                  <div className="mx-4 w-25"><img  className="img-fluid " src="https://media.list.ly/production/439664/2451854/2451854-hachette-livre_600px.jpeg?ver=8994284171" alt="Publisher 4" /></div>
                  <div className="mx-4 w-25"><img className="img-fluid " src="https://media.list.ly/production/439664/2451852/2451852-penguin-random-house_600px.png?ver=3350349456" alt="Publisher 1" /></div>
                  <div className="mx-4 w-25"><img className="img-fluid " src="https://media.list.ly/production/439664/2451848/2451848-pearson_600px.png?ver=6376087790" alt="Publisher 2" /></div>
                  <div className="mx-4 w-25"><img  className="img-fluid " src="https://media.list.ly/production/439664/2451849/2451849-thomson-reuters_600px.png?ver=8462315609" alt="Publisher 3" /></div>
                  <div className="mx-4 w-25"><img  className="img-fluid " src="https://media.list.ly/production/439664/2451854/2451854-hachette-livre_600px.jpeg?ver=8994284171" alt="Publisher 4" /></div>
                  
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="blog-wrapper py-5 px-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className='section-heading mb-50'>Book Reviews & News</h3>
            </div>
            <BlogCard data={blogState}/>
      
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
