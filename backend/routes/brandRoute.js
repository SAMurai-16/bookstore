const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();
const {createbrand, updatebrand,deletebrand,getabrand,getallbrand} = require("../controllers/brandCtrl")


router.post("/",authMiddleware,isAdmin,createbrand);
router.put("/:id",authMiddleware,isAdmin,updatebrand);
router.delete("/:id",authMiddleware,isAdmin,deletebrand)
router.get("/:id",getabrand);
router.get("/",getallbrand);


module.exports = router;