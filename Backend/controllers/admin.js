const Sequelize = require("sequelize")
const Op = Sequelize.Op
const User = require("../models").User
const bcrypt = require("bcryptjs")
const _ = require("loadsh")
const jwt = require("jsonwebtoken")
const mailSend = require("../mails/mail")
const { v4: uuidv4 } = require("uuid");
const passport = require('passport');
const ProductReview = require("../models").ProductReview
const Order = require("../models").Order
const OrderDetail = require("../models").OrderDetail
const Product = require("../models").Product
const Categories = require("../models").categories
const cloudinary = require("cloudinary").v2
//ADMIN LOGIN
const adminLogin = async (req,res) =>{
    const respObj = {
        data : null,
        message : ""
    }
    try {
        
   
    const {email,password} = req.body;
    const existigUser = await User.findOne({
        where : {
            email : email,
            role :  "admin" 
        }

    })
    console.log(existigUser);
    if(!existigUser){
        respObj.message = "this is for Admin ! ";
        return res.status(400).send(respObj);
    }
const checkPassword = await bcrypt.compare(password , existigUser.password)
if(!existigUser || !checkPassword) { 
    respObj.message = "Invalid Email or Password !";
    return res.status(400).send(respObj);
 }
//SET TOKEN 
if(existigUser && checkPassword) {
    const userToken = _.pick(existigUser , ["name", "email", "PhoneNumber", "id", "role"]);
    var token = jwt.sign(JSON.parse(JSON.stringify(userToken)) ,  process.env.PASSPORT_SECRETE_KEY, {
        expiresIn: 86400 * 30, // Token expires after 30 days
      }
)
respObj.data = userToken
respObj.Token = token
respObj.message = "login sucessFully"
return res.status(200).send(respObj);

}
} catch (error) {
    console.log(error);
    respObj.message = error
    res.status(400).send(respObj) 
}

}

//ADMIN DASHBOARD
const getAllUser = async (req,res) =>{
    const respObj = {
        data : null,
        message : ""
    }
    try {
        const user = await User.findAll()
        const userCount = await User.count()
respObj.data = user
respObj.count = userCount
res.status(200).send(respObj);
        
    } catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj) 
    }
}

const deleteProduct = async (req,res) =>{
try {
    const respObj = {
        data : null,
        message : ""
    }

    const result = await Product.delete({
        where : {
            id : req.params.productId
        }
    })
respObj.message = "Product deleted sucessfully"
respObj.data = req.params.productId
res.status(200).send(respObj);
    
} catch (error) {
    console.log(error);
    respObj.message = error
    res.status(400).send(respObj) 
}
}

const addProduct = async (req,res)=>{
    const respObj = {
        data : null,
        message : ""
    }
    try {
      
const image = req.file;
console.log(image);
      const imageCloudinary =   cloudinary.v2.uploader.upload(image, {upload_preset: "my_preset"}, (error, result)=>{
            console.log(result, error);
          });
respObj.data = imageCloudinary;
res.status(200).send(respObj);
// const result = await Product    
    } catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj) 
    }
}
const addCategory = async (req,res)=>{
    try {
        const respObj = {
            data : null,
            message : ""
        }

const result = await Categories    
    } catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj) 
    }
}


const deleteCategory = async (req,res)=>{
    try {
        const respObj = {
            data : null,
            message : ""
        }

const result = await Categories.delete({
    where :{ id : req.params.categoryId}
})    
respObj.data = req.params.categoryId;
respObj.message = "category deleted sucessfully"
    } catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj) 
    }
}

module.exports = {
    adminLogin,
    getAllUser,
    deleteProduct,
    deleteCategory,
    addProduct,
    addCategory
}