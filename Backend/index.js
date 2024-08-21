const express = require("express")
const Product = require("./routes/product")
const auth = require("./routes/UserRoutes")
const admin = require("./routes/adminRoutes")
const webhook = require("./routes/webhook")
const cors = require("cors")
const app =  express();
const bodyParser = require('body-parser');
const cookieParser =  require("cookie-parser")
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()
app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
}));
// Use cookie-parser middleware
app.use(cookieParser());
app.use("/v2/stripe", express.raw({ type: 'application/json' }), webhook)

app.use(bodyParser.json()); // Parse JSON-encoded bodies 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  // Initialize Passport and session
  app.use(passport.initialize());
  app.use(passport.session());
//Product Routes
app.use("/v2/product", Product)
//AUTH ROUTES
app.use("/v2/auth",auth)
//admin routes
app.use("/v2/admin",admin)
//webhooks
app.get("/",(req,res)=>{
  res.status(200).send("<h1>CONNECTION SUCESSFULLLL from backend </h1>")
})

app.listen(5000,()=>{
    console.log("Server runig at 5000");
})
