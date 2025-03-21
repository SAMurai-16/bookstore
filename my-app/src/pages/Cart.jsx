import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "./breadcrumb";
import Meta from "../components/meta";
import { MdDelete } from "react-icons/md";
import { deleteFromCart, getUserCart } from "../features/user/userSlice";

const Cart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    const deleteACartProd = (id)=>{
        dispatch(deleteFromCart(id));
        setTimeout(()=>{
            dispatch(getUserCart())

        },200)
    }

    const cartState = useSelector((state) => state?.auth?.cart);
    // const totalPrice = cartState?.reduce((acc, item) => acc + (item?.ProductId?.price || 0), 0);

    const getTotalPrice = () => {
        return cartState?.reduce((total, item) => total + item?.ProductId?.price || 0 , 0);
      };
   
    
 
    

    return (
        <>
            <Helmet>
                <Meta title="Cart" />
                <Meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>

            <Breadcrumb title="Cart" />

            <section className="cart-wrapper home-wrapper-2 py-5 px-3">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="cart-header d-flex justify-content-between align-items-center">
                                <h4 className="cart-col-1">Product</h4>
                                <h4 className="cart-col-2">Price</h4>
                                <h4 className="cart-col-3">Quantity</h4>
                                <h4 className="cart-col-4">Total</h4>
                            </div>
                        </div>

                        {cartState?.length > 0 ? (
                            cartState.map((item, index) => (
                                <div className="col-12" key={index}>
                                    <div className="cart-data d-flex justify-content-between align-items-center py-3 border-bottom">
                                        {/* Product Image & Title */}
                                        <div className="cart-col-1 d-flex align-items-center gap-15">
                                            <div className="cart-image">
                                                <img
                                                    src={item?.ProductId?.images?.[0]?.url || "https://via.placeholder.com/100"}
                                                    className="img-fluid"
                                                    alt={item?.ProductId?.title || "Product"}
                                                    width={100}
                                                />
                                            </div>
                                            <div>
                                                <h5 className="title">{item?.ProductId?.title}</h5>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="cart-col-2">
                                            <h5 className="price">Rs {item?.ProductId?.price}</h5>
                                        </div>
                                        

                                        {/* Quantity */}
                                        <div className="cart-col-3">
                                            <button className="border-0 " onClick={()=>{deleteACartProd(item?._id);
                                            
                                            }}>
                                            <MdDelete size={23} color="red"/>

                                            </button>
                                      
                                          
                                        </div>

                                        {/* Total Price */}
                                        <div className="cart-col-4">
                                            <h5 className="price">Rs {item?.ProductId?.price}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <h4>Your cart is empty</h4>
                                <Link to="/" className="button mt-3">
                                    Shop Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    <div className="col-12 py-4 mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/" className="button">
                                Continue Shopping
                            </Link>
                            <div className="text-end">
                                <h4>Subtotal: Rs {Array.isArray(cartState) ? getTotalPrice() : "Loading..."}</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to="/checkout" className="button">
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
