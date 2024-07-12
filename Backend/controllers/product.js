const Sequelize = require("sequelize")
const Op = Sequelize.Op
const Product = require("../models").Product
const Categories = require("../models").categories
const Cart = require("../models").Cart
const User = require("../models").User
const CartItem = require("../models").CartItem
const { v4: uuidv4 } = require("uuid");


/* -----GET ALL PRODUCT  */
const getAllProduct = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
     
const searchQuery = req.query.searchQuery ?? "";
const searchValues = searchQuery.split(',').map(value => value.trim());

const searchConditions = searchValues.map(value => ({
    [Op.or]: [
        { name: { [Op.like]: `%${value}%` } },
        { description: { [Op.like]: `%${value}%` } },
        { category: { [Op.like]: `%${value}%` } },
        { features: { [Op.like]: `%${value}%` } },
    ]
}));
      

    const result = await Product.findAll({ where :{
        [Op.or] :  searchConditions
    }});
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


/* -----ADD TO CART   */
const addToCart = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {

        // const result = await CartItem.findOne({
        //     attributes: [
        //         [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity']
        //       ],
        //       include :{
        //         model : Cart ,
        //         where: {
        //             user_id : req.params.userId
        //           }
        //       },
        //       group: ['Cart.id']
             
        // })




        const loggedInUser = await User.findOne({where : {id : req.params.userId}})
        
let cart = await Cart.findOne({where : {user_id : loggedInUser.id}  })
if(!cart){
    cart= await Cart.create({id : uuidv4(), user_id : loggedInUser.id , createdAt : new Date , updatedAt : new Date})
}
const product = await Product.findOne({where : {id :  req.params.productId}})
const alreadyExisitCartItem = await CartItem.findOne({where : {cart_id : cart.id , product_id : product.id}})
if(alreadyExisitCartItem){
    alreadyExisitCartItem.quantity += req.body.amount
      await alreadyExisitCartItem.save();
        // respObj.totalItems = result
        respObj.addedItems = req.body.amount

      respObj.data = alreadyExisitCartItem;
      respObj.message = "success";
      return res.status(200).send(respObj);
}
  if(cart && product){
    const cartItem = await CartItem.create({
        id : uuidv4(),
        cart_id : cart.id,
        product_id : product.id,
        quantity : req.body.amount,
        added_at : new Date(),
        createdAt: new Date(),
        updatedAt : new Date()



    })
        respObj.addedItems = req.body.amount
    respObj.data = cartItem ;
    respObj.message = "success"
    return res.status(200).send(respObj);
  }
  

} 

    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}



/* -----total  CART  items  */
const totalItemsInCart = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        const result = await CartItem.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity']
              ],
              include :{
                model : Cart ,
                where: {
                    user_id : req.params.cartId
                  }
              },
              group: ['Cart.id']
             
        })
        const totalQuantity = result!==null ? result : 0;
        console.log("result----", result);
    respObj.data = totalQuantity ;
    respObj.message = "success"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}



/* -----  CART  Products  */
const cartProducts = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        const result = await CartItem.findAll({
           
              include :[
              {  model : Cart ,
                where: {
                    user_id : req.params.userId
                  }
                
                },
              {
                
                    model: Product
                
              }
            ],
             
        })
        console.log("result----", result);
        // const totalQuantity = result.length > 0 ? CartItem.dataValues.total_quantity : 0;
    respObj.data = result ;
    respObj.message = "success"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}


/* -----  DELETE CART  Products  */
const DeleteCartProducts = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {

        const cart = await Cart.findOne({where :{ user_id : req.params.userId} })
        const itemsToDelete = await CartItem.findAll({
            where: {
                product_id: req.params.productId,
                cart_id: cart.id 
            }
        });
        const result = await CartItem.destroy({
       where : { product_id : req.params.productId , cart_id : cart.id }
             
        })
        console.log("result----", itemsToDelete);
        // const totalQuantity = result.length > 0 ? CartItem.dataValues.total_quantity : 0;
        respObj.deltetedItems = itemsToDelete[0]?.quantity
    respObj.data = req.params.productId ;
    respObj.message = "success"
    return res.status(200).send(respObj);
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
    getSingleProduct,
    addToCart,
    totalItemsInCart,
    cartProducts,
    DeleteCartProducts
}