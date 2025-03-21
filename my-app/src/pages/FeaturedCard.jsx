import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addtoWishlist } from '../features/product/productSlice';
import { FaHeart } from "react-icons/fa";
import { getUserWishlist } from '../features/user/userSlice';


const Featuredcard = (props) => {
  const {grid,data}=props
  const [color,setColor] = useState(false)
  
  

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch wishlist on component mount


  // Select wishlist from Redux store
  const authState = useSelector((state) => state.auth?.user?.wishlist || []);

  // Function to add to wishlist
  const addtolist = (id) => {
    dispatch(addtoWishlist(id));
  };

  console.log("AuthState:", authState); // Debug: Ensure data is fetched
 // Show loading state
    
  return (
   <>
   {
        data?.filter(item => item?.tag === "Featured").map((item, index) => {
            return (
              <div key={index}
                className={`${location.pathname === "/OurStore" ? `gr-${grid}` : "col-3"} d-flex`}>
                <Link to={`/product/${item?._id}`} className="product-card position-relative">
                  <div className="wishlist-icon position-absolute z-10">
                  
                  </div>
                  <div className="product-image d-flex justify-content-center">
                    <img src={item?.images[0]?.url} width={200} alt="product image" />
                    <img src={item?.images[0]?.url} className='img-fluid' alt="product image" />
                  </div>
                  <div className="product-details">
                    <h6 className='brand'>{item?.brand}</h6>
                    <h5 className="product-title">{item?.title}</h5>
                    <ReactStars
                      count={5}
                      value={Number(item?.totalratings)}
                      size={24}
                      color2={'#ffd700'} />
                    <p className='price'>Rs {item?.price}</p>
                  </div>
                  <div className="action-bar position-absolute z-10">
                    <div className='d-flex flex-column gap-15'>
                    
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        }


   </>
  )
}

export default Featuredcard
