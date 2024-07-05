const Sequelize = require("sequelize")
const Op = Sequelize.Op
const User = require("../models").User
const bcrypt = require("bcryptjs")
const _ = require("loadsh")
const jwt = require("jsonwebtoken")
const mailSend = require("../mails/mail")
const { v4: uuidv4 } = require("uuid");



/* -----REGISTER USER  */
const RegisterUser = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
   
    const {email , name , password , phoneNumber} = req.body;

    //CHECK IF ANY FIELD IS EMPTY
    if(!email || !password || !name || !phoneNumber) {
        respObj.message = "Enter fields Properly !";
        return res.status(400).send(respObj);
    }
    
    //CHECK IF EMAIL IS ALREADY REGISTERED
const alreadyExist = await User.findOne(  { where : {email : req.body.email}});
if(alreadyExist){
    respObj.message = "User already exist"
return res.status(400).send(respObj);
}

//CHECK IF PHONE NUMBER IS ALREADY REGISTERED
const alreadyExistPhoneNumber = await User.findOne({ where : {PhoneNumber : req.body.phoneNumber}});
if(alreadyExistPhoneNumber) {
    respObj.message = "Phone Number already exist"
    return res.status(400).send(respObj);
}

//HASH PASSWORD
const hashPassword = await bcrypt.hash(password, 12); 

//CREATE NEW USER

const userCreated = await User.create({
    id: uuidv4(),
    name : req.body.name,
    email : req.body.email,
    password : hashPassword,
    PhoneNumber : req.body.phoneNumber
});

//SET TOKEN 
if(userCreated) {
    const userToken = _.pick(userCreated , ["name", "email", "phoneNumber"]);
    var token = jwt.sign(JSON.parse(JSON.stringify(userToken)) ,  process.env.PASSPORT_SECRETE_KEY, {
        expiresIn: 86400 * 30, // Token expires after 30 days
      }
)
//setCookies
// res.cookie("token", token, { httpOnly:true})
// res.cookie("loginData", userToken, {httpOnly: true})
mailSend(`welcome to bookHouse ${name}`, `this is an email for ${name} , we welcome you to our website bookHouse 😄`, email)
respObj.data = userToken
respObj.message = "user Created SucessFully"
respObj.Token = token
return res.status(200).send(respObj);

}
} 
    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}


/* -----LOGIN USER  */
const loginUser = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
   
    const {email  , password } = req.body;

    //CHECK IF ANY FIELD IS EMPTY
    if(!email || !password) {
        respObj.message = "Enter fields Properly !";
        return res.status(400).send(respObj);
    }
    
    //CHECK IF EMAIL IS exist
const existigUser = await User.findOne(  { where : {email : req.body.email}});
const checkPassword = await bcrypt.compare(password, existigUser.password);
if(!existigUser || !checkPassword) { 
    respObj.message = "Invalid Email or Password !";
    return res.status(400).send(respObj);
 }
//SET TOKEN 
if(existigUser && checkPassword) {
    const userToken = _.pick(existigUser , ["name", "email", "phoneNumber"]);
    var token = jwt.sign(JSON.parse(JSON.stringify(userToken)) ,  process.env.PASSPORT_SECRETE_KEY, {
        expiresIn: 86400 * 30, // Token expires after 30 days
      }
)
respObj.data = userToken
respObj.message = "login sucessFully"
respObj.Token = token
return res.status(200).send(respObj);

}
} 
    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}





module.exports = {
    RegisterUser,
    loginUser
}