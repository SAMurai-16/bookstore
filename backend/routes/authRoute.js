const express = require("express");
const router = express.Router();
const { CreateUser , loginUserCtrl, loginAdmin, getwishlist,  saveaddress, usercart,handleRefreshToken,logout,
    updatePassword,
    getaUser,
    getallUser,
    deleteaUser,
    updateUser,
    forgotPasswordToken,
    resetpassword,
    baby,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateorderstatus,
    getallOrders,
    deletefromcart,
    createCoupon,
    getallCoupons,} = require("../controllers/userCtrl");

const {checkout,paymentVerification
} = require("../controllers/paymentCtrl")
const {authMiddleware,isAdmin} = require("../middleware/authMiddleware")

// Static or specific routes
router.get("/baby",authMiddleware, baby);
router.get("/address", authMiddleware,saveaddress)
// router.get("/get-allorders",authMiddleware,isAdmin,getallOrders)
// router.get("/get-orders",authMiddleware,getOrders)

// router.post("/coupon",authMiddleware,applyCoupon)
// router.post("/order/status/:id",authMiddleware,isAdmin,updateorderstatus)
// Authentication routes
router.post('/register', CreateUser);
router.post('/login', loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart/order",authMiddleware,createOrder)
router.post('/order/checkout',authMiddleware,checkout)
router.post('/order/paymentVerification',authMiddleware,paymentVerification)
router.post('/coupon', createCoupon);

// Password-related routes
router.put("/password", authMiddleware, updatePassword);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetpassword);

// Token and session management routes
router.get('/refresh', handleRefreshToken);
router.get("/logout", logout);
router.get('/coupon', getallCoupons);

// User-specific actions
router.get("/cart", authMiddleware, getUserCart);
router.post("/cart", authMiddleware, usercart);
router.get("/wishlist", authMiddleware, getwishlist);

router.delete("/cart", authMiddleware, emptyCart);
router.get("/all-user", getallUser);

router.delete("/cart/:id", authMiddleware,deletefromcart)

// Dynamic routes (place last)
router.get("/:id", authMiddleware, getaUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteaUser);






module.exports = router;
 