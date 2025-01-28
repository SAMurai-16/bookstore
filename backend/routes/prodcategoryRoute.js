const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const {createcategory, updatecategory,deletecategory,getacategory,getallcategory} = require("../controllers/prodcategoryCtrl")


router.post("/",authMiddleware,isAdmin,createcategory);
router.put("/:id",authMiddleware,isAdmin,updatecategory);
router.delete("/:id",authMiddleware,isAdmin,deletecategory)
router.get("/:id",getacategory);
router.get("/",getallcategory);


module.exports = router;