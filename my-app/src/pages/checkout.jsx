import React, { useEffect, useState } from "react";
import Breadcrumb from "./breadcrumb";
import Meta from "../components/meta";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { getConfig } from "../utils/axiosConfig";
import { Helmet } from "react-helmet";
import { createOrder, EmptyCart, getUserCart } from "../features/user/userSlice";
import { getAllCoupons } from "../features/user/userSlice";
import { base_url} from "../utils/axiosConfig";

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(
    ()=>{
      dispatch(getUserCart())
      dispatch(getAllCoupons())
    },[]
  )



  const getTotalPrice = () => {
    return cartState?.reduce((total, item) => total + item.ProductId.price, 0);
  };



  const Coupons = useSelector((state)=> state.auth.coupons)
  console.log(Coupons)

  const cartState = useSelector((state) => state.auth.cart);
  const [couponInfo, setCouponInfo] = useState({
  name:null
  });
  const [Discount,setDiscount] = useState(0)
  const [paymentInfo,setPaymentInfo] = useState({razorpayPaymentId:"", razorpayOrderId:""})
  const [cartProductState,setCartProductState] = useState([])



  const applyCoupon = () => {
    if (!couponInfo) {
        alert("Please enter a coupon code.");
        return;
    }

    const coupon = Coupons.find((item) => item.name === couponInfo);

    if (!coupon) {
        alert("Invalid coupon code.");
        return;
    }

    const currentDate = new Date();
    const expiryDate = new Date(coupon.expiry); // Ensure expiry date is in a valid format

    if (expiryDate < currentDate) {
        alert("This coupon has expired.");
        return;
    }

    const discount = ((coupon.discount)*getTotalPrice() )/100
    setDiscount(discount)
    

    alert(`Coupon applied! Discount: ${coupon.discount}%`);
};


  



  
  


 

  const loadScript = (src)=>{
    return new Promise((resolve)=>{
      const script = document.createElement("script");
      script.src = src;
      script.onload = () =>{
        resolve(true);
      }
      script.onerror = ()=>{
        resolve(false);
      }   
      document.body.appendChild(script)
    
    })

}

useEffect(()=>{
  let items =[];
  for (let index = 0; index < cartState?.length; index++) {
    items.push({product:cartState[index].ProductId._id,price:cartState[index].price})
    
  }
   setCartProductState(items)
},[])
console.log(cartProductState);


const totalPriceAfterDiscount = getTotalPrice() - Discount



const checkOutHandler = async () =>{
  
  try{
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
  if(!res){
    alert("Razorpay SDK failed to load")
    return;
  }
  

  const result = await axios.post(`${base_url}user/order/checkout`,{amount:totalPriceAfterDiscount},getConfig())
  if(!res){
    alert("something went wrong")
    return;
  }


  const { amount, id, currency } = result.data.order;
  console.log(id);


  
  

  
  const options = {
      key: "rzp_test_sYykG3ondpFgDS", // Ensure key is a string
      amount: amount,  // Use extracted amount directly
      currency: currency,
      name: "Your Company Name",
      description: "Payment for your order",
      order_id: id, // Use id instead of 'order.id'
  
    // this is make function which will verify the payment
    // after making the payment 
    handler: async (response) => {
      try {
        console.log("Razorpay Response:", response);
    
        // Temporary object to store payment info
        const paymentDetails = {
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
        };
    
        // Send payment verification request
        await fetch(`${base_url}order/paymentVerification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getConfig().headers,
          },
          body: JSON.stringify(paymentDetails),
        });
    
        alert("Payment successful!");
    
        // Now dispatch createOrder with updated payment details
        dispatch(createOrder({
          totalPrice: getTotalPrice(),
          totalPriceAfterDiscount: totalPriceAfterDiscount,
          paymentInfo: paymentDetails,  // Use the temporary object
          orderItems: cartProductState
        }));
        navigate("/");
        dispatch(EmptyCart())
        
    
      } catch (err) {
        alert("Payment failed: " + err.message);
      }
    
    },
    prefill: {
      name: "John Doe", // add customer details
      email: "john@example.com", // add customer details
      contact: "9999999999", // add customer details
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
// you can change the gateway color from here according to your
// application theme
      color: "#3399cc",
    },
  };
  const rzpay = new Razorpay(options);
  // this will open razorpay window for take the payment in the frontend
  // under the hood it use inbuild javascript windows api 
  rzpay.open(options);}
catch (err) {
  alert("Error creating order: " + err.message);
}
}



  return (
    <>
       <Helmet>
                        <Meta title="Checkout" />
                        <Meta charSet="utf-8" />
                        <title>Checkout</title>
        </Helmet>
      <div className="checkout-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
          <div className="col-6">
    <h4>Apply Coupon</h4>
    <form className="d-flex align-items-center gap-2"
     onSubmit={(e) => {
      e.preventDefault() // Prevent page refresh
      applyCoupon();
  }}
    >
        <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Coupon Code" 
            value={couponInfo}
            onChange={(e)=>setCouponInfo(e.target.value)}
            
        />
          <button className="button" type="submit">Apply</button>
    </form>
</div>


            <div className="col-md-5">
              <h3 className="mb-4">Order Summary</h3>
              <ul className="list-group mb-3">
                {cartState?.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <div>
                      <img
                                                    src={item?.ProductId?.images?.[0]?.url || "https://via.placeholder.com/100"}
                                                    className="img-fluid"
                                                    alt={item?.ProductId?.title || "Product"}
                                                    width={100}
                                                /></div>
                    <div>
                    <p>{item.ProductId.title}</p>
                    <p></p>
                    </div>
                    <strong>Rs {item.ProductId.price}</strong>
                  </li>
                ))}
                <ul>
                <li className="list-group-item d-flex justify-content-between">
                  <p>Total</p>
                  <p>Rs {getTotalPrice()}</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <p>Discount</p>
                  <p>Rs {Discount}</p>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>Rs {getTotalPrice()-Discount}</strong>
                </li>

                </ul>
              </ul>
              <button className="btn btn-primary w-100" onClick={checkOutHandler}>Place Order</button>
              <Link to="/cart" className="btn btn-outline-secondary w-100 mt-3">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
