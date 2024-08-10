const express = require("express")
const router =  express.Router();
const webhookRoute = require("../controllers/webhook");
const bodyParser = require('body-parser');

router.post("/webhook",express.raw({ type: 'application/json' }) ,webhookRoute.stripeWebhook);
module.exports = router  
