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
    getallOrders,} = require("../controllers/userCtrl");
const {
} = require("../controllers/userCtrl")
const {authMiddleware,isAdmin} = require("../middleware/authMiddleware")

// Static or specific routes
router.get("/baby",authMiddleware, baby);
router.get("/address", authMiddleware,saveaddress)
router.get("/get-allorders",authMiddleware,isAdmin,getallOrders)
router.get("/get-orders",authMiddleware,getOrders)

router.post("/coupon",authMiddleware,applyCoupon)
router.post("/order/status/:id",authMiddleware,isAdmin,updateorderstatus)
// Authentication routes
router.post('/register', CreateUser);
router.post('/login', loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart/cash-order",authMiddleware,createOrder)

// Password-related routes
router.put("/password", authMiddleware, updatePassword);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetpassword);

// Token and session management routes
router.get('/refresh', handleRefreshToken);
router.get("/logout", logout);

// User-specific actions
router.get("/cart", authMiddleware, getUserCart);
router.post("/cart", authMiddleware, usercart);
router.get("/wishlist", authMiddleware, getwishlist);

router.delete("/cart", authMiddleware, emptyCart);
router.get("/all-user", getallUser);

// Dynamic routes (place last)
router.get("/:id", authMiddleware, getaUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteaUser);





module.exports = router;
 