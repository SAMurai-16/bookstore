const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const {createblog,updateblog, getblog, getallblogs, deleteblog, likeblog, dislikeblog,uploadImages}  = require("../controllers/blogctrl")
const { uploadphoto, blogImgResize } = require("../middleware/uploadimages")
const router = express.Router();

router.post("/",createblog)
router.put("/:id",updateblog);
router.get("/disliker",dislikeblog);
router.get("/liker",likeblog);
router.get("/:id",getblog);
router.get("/",getallblogs);
router.put("/upload/:id",authMiddleware,isAdmin,uploadphoto.array('images',10),blogImgResize,uploadImages)
router.delete("/:id",authMiddleware,isAdmin,deleteblog)





module.exports=router;