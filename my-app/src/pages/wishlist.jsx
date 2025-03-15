import React, { useEffect } from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import { useDispatch, useSelector } from 'react-redux';
import { getUserWishlist } from '../features/user/userSlice';
import { addtoWishlist } from '../features/product/productSlice';

const wishlist = () => {
  const dispatch = useDispatch();
  const removefromWishlist = (id) => {
    dispatch(addtoWishlist(id)).then(() => {
        dispatch(getUserWishlist()); // ✅ Fetch updated wishlist after removing item
    });
};



     useEffect(() => {
          dispatch(getUserWishlist()); // Runs only once when component mounts
      }, []);
      const WishlistState = useSelector(state=>state.auth.user.wishlist)
 
      
 

  return (
    <>
    <Meta title={"Wishlist"}/>
    <Breadcrumb title="Wishlist"/>
    <div>
      <div className="wishlist-wrapper home-wrapper-2 py-5">
         <div className="container-xxl">
             <div className="row">
              {
                WishlistState?.map((item,index)=>{
                  return(
                    <div className="col-3" key={index}>
                    <div className="compare-product-card position-relative">
                         <img 
                         onClick={()=>{
                          removefromWishlist(item?._id)
                         }}
                         src="images/cross.svg" alt="cross" className="position-absolute img-fluid cross" />

                        <div className="product-card-image">
                        <img src={item?.images[0].url ? item?.images[0].url : "images/watch.jpg"} alt="watch"
                        className='img-fluid w-100 d-block mx-auto'
                        width={100}
                        />
                        </div>
                        <div className="compare-product-details">
                            <h5 className="title">
                            {item?.title}
                            </h5>
                            <h6 className="price">Rs {item?.price}</h6>
                        </div>
                    </div>        
            </div>

                  )
                })
              }

            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default wishlist
