import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallOrders } from "../features/user/userSlice"; // Import order fetching action
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.auth.Orders) || []; // Ensure orders is always an array

  useEffect(() => {
    dispatch(getallOrders());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order?._id} className="col-md-6 mb-4">
              <div className="card shadow-sm p-3">
                {/* Order ID & Date (Top Part) */}
                <div className="d-flex justify-content-between text-muted small mb-3">
                  <span>Order ID: {order?._id}</span>
                  <span>{new Date(order?.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Order Details (Bottom Part) */}
                <div className="border-top pt-2">
                  {order?.orderItems?.map((item, index) => (
                    <div key={index} className="d-flex align-items-center gap-3 mb-2">
                      <img
                        src={item?.product?.images?.[0]?.url || "https://via.placeholder.com/50"}
                        alt={item?.product?.title || "Product"}
                        width={50}
                        height={50}
                        className="rounded"
                      />
                      <div>
                        <p className="mb-1 ml-2 fw-bold">{item?.product?.title}</p>
                        
                      </div>
                    </div>
                  ))}

                  {/* Price, Status & Actions */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="fw-bold">
                      MRP: 
                      Rs {order?.totalPrice}
                    </span>
                    <span className="fw-bold">
                      Discounted Price: 
                      Rs {order?.totalPriceAfterDiscount||order?.totalPrice}
                    </span>
                    <Link to={`/order/${order?._id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
