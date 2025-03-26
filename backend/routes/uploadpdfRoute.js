const express = require("express")
const { uploadPDFmulter } = require("../middleware/uploadpdf")
const { uploadPDF,deletePDF } = require("../controllers/uploadpdfCtrl")
const{ authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();


router.post("/",authMiddleware,isAdmin,uploadPDFmulter.array('files',5),uploadPDF)
router.delete("/delete-img/:id",authMiddleware,isAdmin,deletePDF)




module.exports = router