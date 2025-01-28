const express = require("express")
const {createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct, addtowishlist, rating, uploadImages}  =require("../controllers/productCtrl")
const {isAdmin,authMiddleware} = require("../middleware/authMiddleware")

const router  = express.Router()

router.post("/",authMiddleware ,isAdmin,createProduct)
router.get("/:id",getaProduct)
router.get("/" ,getAllProduct)

router.put("/wishlist",authMiddleware,addtowishlist)
router.put("/rating",authMiddleware,rating)
router.put("/:id",authMiddleware ,isAdmin, updateProduct)
router.delete("/:id",authMiddleware,deleteProduct);

module.exports = router