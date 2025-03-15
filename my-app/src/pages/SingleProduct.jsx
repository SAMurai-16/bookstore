import React, { useEffect, useState } from 'react'
import Breadcrumb from './breadcrumb'
import Meta from '../components/meta'
import Productcart from './Productcart'
import ImageZoom from "react-image-zooom";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct} from '../features/product/productSlice';
import { addProdToCart, getUserCart } from '../features/user/userSlice';



const SingleProduct = () => {
    const [AlreadyAdded ,setAlreadyAdded ]= useState(false);
    const navigate = useNavigate()

    
    const [state,setstate]= useState(0);

    const location = useLocation();
    const getProdId = location.pathname.split("/")[2]



    
   
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProduct(getProdId));
        dispatch(getUserCart())
    },[])
    const productstate = useSelector(state=>state.prod.product)
    const images1 =  productstate?.images
    const cartstate = useSelector(state=>state.auth.cart)
    
    

    const addProd = ()=>{
        dispatch(addProdToCart({ProductId:productstate?._id,price:productstate?.price,quantity:1})   );
        setTimeout(()=>
        {
            navigate("/cart");
        },1000)
        

    }

    useEffect(()=>{
        for(let index = 0; index< cartstate?.length ; index++){
            if (getProdId === cartstate[index]?.ProductId?._id){
                setAlreadyAdded(true)


            }
        }
    })
    
    
    
  
   
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
                         <ImageZoom src={"https://wallpaperaccess.com/full/3046105.jpg"} alt="A image to apply the ImageZoom plugin" zoom="200" 
                         />
                    </div>
                </div>
                <div className=" d-flex other-product-images flex-wrap gap-15">
                   {images1?.map((item,index)=>{
                    return(

                        <div key={index}>
                        <img onClick={()=>{setstate(index);
                        }} src={item?.url ? item?.url : "https://wallpaperaccess.com/full/3046105.jpg"}
                        className='img-fluid' alt="" />
                    </div>

                    )
                }

                )}

            

                </div>
                </div>
                <div className="col-6">
                    <div className="main-product-details">
                        <div className="title">
                            <h3>{productstate?.title}</h3>
                        </div>
                        <div className="price-rating">
                            <p>Price:Rs {productstate?.price}</p>
                        </div>
                        <div className="details py-5">
                            <div className="d-flex gap-15">
                                <p className=''>Quantity</p>
                                <input type="number"
                                min={1}
                                max={9} />
                               <div className="d-flex justify-content-center gap-30">
                            <button className="button"

                            
                            onClick={()=> {AlreadyAdded ? navigate('/cart'): 
                                addProd()
                             }}>
                                {AlreadyAdded ? " Go to Cart" : "Add to Cart" }
                                </button>
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
