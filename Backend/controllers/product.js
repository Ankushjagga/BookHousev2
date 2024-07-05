const Sequelize = require("sequelize")
const Op = Sequelize.Op
const Product = require("../models").Product
const Categories = require("../models").categories


/* -----GET ALL PRODUCT  */
const getAllProduct = async (req,res)=>{
    try {
        

    let respObj = {
        data : null,
        message : ""
    }

    const result = await Product.findAll({});
respObj.data = result ;
respObj.message = "success"
    res.status(200).send(respObj);
} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}

/* -----EXPLORE RANDOM PRODUCT  */
const getRandomProduct = async (req,res)=>{
    try {
        let respObj = {
            data : null,
            message : ""
        }
        const count = await Product.count({})
        if(count == 0){
            respObj.message = "NO PRODUCT AVAILABE IN DATABASE"
   return   res.status(400).send(respObj);
        }
        // Generate a random offset 
        const randomOffset = Math.floor(Math.random()* count) 

        const result = await Product.findOne({offset : randomOffset});
respObj.data = result ;
respObj.message = "success"
    res.status(200).send(respObj);
} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}

/* -----GET LATEST PRODUCTS  */
const getLatestProduct = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        

 

    const result = await Product.findAll({ order :[ ["createdAt", 'DESC']] });
respObj.data = result ;
respObj.message = "success"
    res.status(200).send(respObj);
} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}

/* -----GET ALL CATEGORIES  */
const getAllCategories = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        

 

    const result = await Categories.findAll({});
respObj.data = result ;
respObj.message = "success"
    res.status(200).send(respObj);
} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}


/* -----GET PRODUCTS BY CATEGORy  */
const getProductsByCategory = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        

 

    const result = await Product.findAll({where : {category : req.params.category}});
respObj.data = result ;
respObj.message = "success"
    res.status(200).send(respObj);
} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}


/* -----GET  SINGLE PRODUCT   */
const getSingleProduct = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        

 

    const result = await Product.findOne({where : {id : req.params.id} });
respObj.data = result ;
respObj.message = "success"
    res.status(200).send(respObj);
} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}



module.exports = {
    getAllProduct,
    getRandomProduct,
    getLatestProduct,
    getAllCategories,
    getProductsByCategory,
    getSingleProduct
}