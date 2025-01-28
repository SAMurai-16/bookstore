const express = require("express")
const { uploadphoto, productImgResize } = require("../middleware/uploadimages")
const { uploadImages,deleteimages } = require("../controllers/uploadCtrl")
const{ authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


router.post("/",authMiddleware,isAdmin,uploadphoto.array('images',10),productImgResize,uploadImages)
router.delete("/delete-img/:id",authMiddleware,isAdmin,deleteimages)




module.exports = router