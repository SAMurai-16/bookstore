const express=  require("express")
const {createCoupon, getallcoupons, updatecoupon, deletecoupon} = require("../controllers/couponCtrl");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/",authMiddleware,isAdmin, createCoupon);
router.get("/",authMiddleware,isAdmin,getallcoupons)
router.put("/:id",authMiddleware,isAdmin,updatecoupon)
router.delete("/:id",authMiddleware,isAdmin,deletecoupon)
module.exports = router;