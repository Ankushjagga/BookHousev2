const express = require("express")
const router =  express.Router();
const authController = require("../controllers/auth");


router.post('/register', authController.RegisterUser)
router.post('/login', authController.loginUser)
router.post('/contactUs', authController.contactUs)

module.exports = router