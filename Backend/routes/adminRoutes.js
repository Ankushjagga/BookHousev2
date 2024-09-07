const express = require("express")
const router =  express.Router();
const adminController = require("../controllers/admin");
// const { storage } = require('../config/storage');
// const multer = require('multer');
// const upload = multer({ storage });

router.post('/adminLogin', adminController.adminLogin)
router.post('/addProduct' ,adminController.addProduct)
router.post('/addCategory',adminController.addCategory)
router.get('/getAllUser',adminController.getAllUser)
router.get('/getAllOrders',adminController.getAllOrders)
router.get('/AllproductReviews',adminController.AllproductReviews)
router.put('/updateProduct/product/:productId',adminController.updateProduct)
router.delete('/deleteProduct/product/:productId',adminController.deleteProduct)
router.delete('/deleteCategory/category/:categoryId',adminController.deleteCategory)


module.exports = router