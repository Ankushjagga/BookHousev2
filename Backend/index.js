const express = require("express")
const Product = require("./routes/product")
const auth = require("./routes/UserRoutes")
const cors = require("cors")
const app =  express();
const bodyParser = require('body-parser');
const cookieParser =  require("cookie-parser")
require('dotenv').config()
app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
}));
// Use cookie-parser middleware
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON-encoded bodies 
app.use(bodyParser.urlencoded({ extended: true }));

//Product Routes
app.use("/v2/product", Product)
//AUTH ROUTES
app.use("/v2/auth",auth)


app.listen(5000,()=>{
    console.log("Server runig at 5000");
})
