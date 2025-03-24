import React, { useEffect, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from './breadcrumb';
import Meta from '../components/meta';
import Productcart from './Productcart';
import ImageZoom from 'react-image-zooom';
import { getProduct } from '../features/product/productSlice';
import { addProdToCart, getallOrders, getUserCart } from '../features/user/userSlice';

const SingleProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [go,setGo] = useState(false)

     const ratingState = useSelector(state=>state?.prod?.singleproduct?.ratings)
       const orders = useSelector(state => state?.auth?.Orders) || [] ;

         useEffect(() => {
           dispatch(getallOrders());
         }, [dispatch]);


    const getProdId = useMemo(() => location.pathname.split('/')[2], [location]);

    useEffect(() => {
        const filterOrders = orders.flatMap((item) =>
            item?.orderItems
                .filter(orderItem => orderItem?.product?._id === getProdId)
                .map(orderItem => orderItem.product._id)
        );

        if (filterOrders.includes(getProdId)) {
            setGo(true);
        } else {
            setGo(false); // Ensures state consistency
        }
    }, [orders, getProdId]); // Runs when `orders` or `getProdId` changes

    console.log(go);
    

    
    
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    useEffect(() => {
        dispatch(getProduct(getProdId));
        dispatch(getUserCart());
       
    }, [dispatch, getProdId]);

    const Product = useSelector(state => state?.prod?.singleproduct);
    const getUserId = useSelector(state=>state?.auth?.user?._id)
    const cart = useSelector(state => state?.auth?.cart);
    const images = Product?.images || [];
    const ratings = Product?.ratings|| [];
    const[allowed,setAllowed] = useState(false)

    const isAlreadyAdded = useMemo(() => 
        Array.isArray(cart) && cart.some(item => item?.ProductId?._id === getProdId), 
    [cart, getProdId]);
    
    const addToCart = () => {
        dispatch(addProdToCart({ ProductId: Product?._id, price: Product?.price, quantity: 1 }));
        setTimeout(() => navigate('/cart'), 1000);
    };

   
    
    const existingReview = ratingState?.find(item => item?.postedby?._id === getUserId);
    
    return (
        <>
            <Meta title={Product?.title || 'Product Name'} />
           
            
            <div className="main-product-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        {/* Left Column - Product Images */}
                        <div className="col-md-6">
                            <div className="main-product-image">
                                <ImageZoom src={images[selectedImageIndex]?.url || "https://wallpaperaccess.com/full/3046105.jpg"} 
                                           alt="Product Image" zoom="200" />
                            </div>
                            <div className="d-flex other-product-images flex-wrap gap-15 mt-3">
                                {images.map((item, index) => (
                                    <img key={index} 
                                         onClick={() => setSelectedImageIndex(index)}
                                         src={item?.url || "https://wallpaperaccess.com/full/3046105.jpg"}
                                         className='img-fluid thumbnail' 
                                         alt="Product Thumbnail" />
                                ))}
                            </div>
                        </div>
                        
                        {/* Right Column - Product Details */}
                        <div className="col-md-6">
                            <div className="main-product-details">
                                <h3 className="product-title">{Product?.title}</h3>
                                <p className="product-price">Price: ₹{Product?.price}</p>
                                
                                <div>
                                    <p> <span className="text-bold">Description</span> : {Product?.description}</p>
                                </div>
                                
                                <div className="d-flex gap-3">
                                { !go && (
                                    <button className="button" onClick={() => isAlreadyAdded ? navigate('/cart') : addToCart()}>
                                        {isAlreadyAdded ? "Go to Cart" : "Add to Cart"}
                                    </button>)
}
                                  {go &&( <Link to="/orders" className="button signup">Go to Orders</Link>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="reviews-container mt-5 p-4 border rounded" style={{ backgroundColor: "#f9f9f9" }}>
                        <h4 className="mb-3">Customer Reviews</h4>
                        {
                            Product?.sold.map((item,index)=>{
                                if(item?.includes(getUserId)){ 
                                    return <Link to={`review`} key={index}>{existingReview ? "Edit Review" : "Add Review"}</Link>
                                }
                                    return null
                               
                            })
                        }
                        
                        {ratings.length > 0 ? (
                            ratings.map((item, index) => (
                                <div key={index} className="review mb-3 p-3 border rounded">
                                    <strong>{item?.postedby?.firstname} {item?.postedby?.lastname}</strong>
                                    <p >Rating:{item?.star}</p>
                                    <p>{item?.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>
            </div>
            
            
            
        </>
    );
};

export default SingleProduct;
