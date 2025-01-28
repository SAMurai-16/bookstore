import React from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'

const wishlist = () => {
  return (
    <>
    <Meta title={"Wishlist"}/>
    <Breadcrumb title="Wishlist"/>
    <div>
      <div className="wishlist-wrapper home-wrapper-2 py-5">
         <div className="container-xxl">
             <div className="row">
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                             <img src="images/cross.svg" alt="cross" className="position-absolute img-fluid cross" />

                            <div className="product-card-image">
                            <img src="images/watch.jpg" alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">
                                wallah wallah
                                watch
                                </h5>
                                <h6 className="price">Rs 9876</h6>
                            </div>
                        </div>        
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default wishlist
