const express = require("express")
const router =  express.Router();
const adminController = require("../controllers/admin");
const { storage } = require('../config/storage');
const multer = require('multer');
const upload = multer({ storage });

router.post('/adminLogin', adminController.adminLogin)
router.post('/addProducts',upload.single('images') ,adminController.addProduct)
router.post('/addCategory',upload.single('images') ,adminController.addCategory)
router.get('/getAllUser',adminController.getAllUser)
router.get('/getAllOrders',adminController.getAllOrders)
router.get('/AllproductReviews',adminController.AllproductReviews)


module.exports = router