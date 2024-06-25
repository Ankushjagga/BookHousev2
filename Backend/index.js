const express = require("express")
const router = require("./routes/index")
const cors = require("cors")
const app =  express();
const bodyParser = require('body-parser');
const cookieParser =  require("cookie-parser")
app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
}));
// Use cookie-parser middleware
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router)


app.listen(5000,()=>{
    console.log("Server runig at 5000");
})
