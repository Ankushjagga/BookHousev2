const express = require("express")
const router =  express.Router();
const adminController = require("../controllers/admin");


router.post('/adminLogin', adminController.adminLogin)


module.exports = router