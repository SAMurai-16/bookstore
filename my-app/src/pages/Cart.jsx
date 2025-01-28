import React from 'react'
import Breadcrumb from './breadcrumb'
import watch from "../images/acc.jpg"
import {Helmet} from "react-helmet";
import Meta from '../components/meta';
import { Link } from 'react-router-dom';


 
const Cart = () => {
  return (
    <>
     <Helmet>
    <Meta title="Login"/>
    <Meta charSet="utf-8" />
    <title>cart</title>
  
</Helmet>
<Breadcrumb title= "cart"/>
<section className="cart-wrapper home-wrapper-2 py-5">
    <div className="contianer-xxl">
        <div className="row">
            <div className="col-12">
                <div className='cart-header d-flex justify-content-between align-content-center'>
                    <h4 className='cart-col-1'>Product</h4>
                    <h4 className='cart-col-2'>Price</h4>
                    <h4 className='cart-col-3'>Qunatity</h4>
                    <h4 className='cart-col-4'>Total</h4>
                </div>
                <div className='cart-data d-flex justify-content-between align-content-center'>
                    <div className='cart-col-1 d-flex align-items-center gap-15'>
                        <div className='w-25'><img src={watch} className="img-fluid" alt="" /></div>
                        <div className='w-75'> 
                            <h5 className="title">ghdhfio</h5>
                            <p className="color">dfeda</p>
                            <p className="size">r</p>
                        </div>
                        </div>
                    <div className='cart-col-2'>
                        <h5 className="price">dbsh</h5>
                    </div>
                    <div className='cart-col-3'>
                        <div>
                            <input type="number" 
                            min={1}
                            max={10}

                            />
                        </div>
                        <div>

                        </div>
                    </div>
                    <h4 className='cart-col-4'>Total</h4>
                </div>
            </div>
            <div className="col-12 py-2 mt-4">
               <div className="d-flex justify-content-between align-items-baseline ">
               <Link className='button'>
               Continue To Shopping </Link>
               <div className='d-flex flex-column align-items-end'>
                <h4>Subtotal : $1000</h4>
                <p>Taxes and Shiiping </p>
                <Link className='button'>
                Checkout </Link>
               </div>

               </div>

            </div>
        </div>
    </div>
</section>
</>
  )
}

export default Cart
