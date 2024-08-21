const Sequelize = require("sequelize")
const Op = Sequelize.Op
const Product = require("../models").Product
const Categories = require("../models").categories
const Cart = require("../models").Cart
const User = require("../models").User
const CartItem = require("../models").CartItem
const ProductReview = require("../models").ProductReview
const stripe = require("stripe")(process.env.STRIPE_SCRETE_KEY)
const express = require("express")
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
    const count = await Product.count()
    respObj.count = count;
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
    const count =  await Categories.count({}) 
respObj.data = result ;
respObj.count = count
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
      respObj.message = "Item added Sucessfully";
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
    respObj.message = "Item added Sucessfully";

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
    // respObj.message = "success"
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
    respObj.message = "Item Deleted Sucessfully"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}
/* -----  DELETE  All CART  Products  */
const DeleteAllCartProducts = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {

        const cart = await Cart.findOne({where :{ user_id : req.params.userId} })
  const   result = await CartItem.destroy({
       where : { cart_id : cart.id }
             
        })
        // const totalQuantity = result.length > 0 ? CartItem.dataValues.total_quantity : 0;
    respObj.data = result ;
    respObj.message = "Cart clear sucesfully"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}

/* ----- PRODUCTS REVIEWS   */
const productReviews = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        const result = await ProductReview.create({
         user_id : req.params.userId,
         product_id : req.params.productId,
         review_text : req.body.review,
         rating : req.body.rating
        })
        const result2 = await ProductReview.findOne({
            where : {
            
                user_id : req.params.userId,

            }   ,
            include : [
            {
            
                model : Product
            },
             {
                model : User
            }
        ]
        })
            
        console.log("result----", result);
    respObj.data = result2 ;
    respObj.message = "Review added sucessfully"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}


/* ----- UPDATE PRODUCTS REVIEWS   */
const updateProductReviews = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        const result = await ProductReview.update({
            review_text : req.body.review,
            rating : req.body.rating ,
            where :{

                product_id : req.params.productId,
            }
     
        })
       
            
        console.log("result----", result);
    respObj.data = result ;
    respObj.message = "Product Review updated sucessfully"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}
/* ----- delete PRODUCTS REVIEWS   */
const deleteProductReviews = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        const result = await ProductReview.destroy({
            where :{

                product_id : req.params.productId,
            }
     
        })
       
            
        console.log("result----", result);
    respObj.data = result ;
    respObj.message = "Product Review deleted sucessfully"
    return res.status(200).send(respObj);
  }




    catch (error) {
        console.log(error);
        respObj.message = error
        res.status(400).send(respObj)
        
    }

}

/* ----- GET SINGLE PRODUCTS REVIEWS   */
const getSingleproductReview = async (req,res)=>{
    let respObj = {
        data : null,
        message : ""
    }
    try {
        const result = await ProductReview.findAll({
where : {

    product_id : req.params.productId,
}   ,
include : [
{

    model : Product
},
 {
    model : User
}
]


        })
        console.log("result----", result);
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



const payment =  async (req, res) => {
    const { data } = req.body;
    const cartMeta = await data.products.map((ele)=>{ 
       return {

           productId : ele.product_id,
        //    quantity : ele.quantity,
        //    price : ele.Product.price,
        //    name : ele.Product.name
        } 

    })
    const customer = await stripe.customers.create({
        metadata: { 
          userId: req.body.userId,
        //   cart: JSON.stringify(cartMeta),
        },
      });
    // const cartQuantity = products.reduce((accum, ele)=> accum+=ele.quantity,0)
//   console.log(cartQuantity);
    try {
        const lineItems = await data.products.map((ele)=>{
            console.log(`${ele.Product.image}`)

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name : ele.Product.name,
                        images : [`${ele.Product.image}`],
                        metadata: {
                            id: ele.id,
                        },
                    },
                    unit_amount:  (ele.Product.price*100 + 50*100 ),
                },
                quantity : ele.quantity,
            
        }
      })
      const session = await stripe.checkout.sessions.create({
        line_items : lineItems,
        // line_items: [
        //     {
        //       price_data: {
        //         currency: 'usd',
        //         product_data: {
        //           name: 'T-shirt',
        //         },
        //         unit_amount: 2000, // Amount in cents
        //       },
        //       quantity: 1,
        //     },
        //     {
        //       price_data: {
        //         currency: 'usd',
        //         product_data: {
        //           name: 'Jeans',
        //         },
        //         unit_amount: 4000, // Amount in cents
        //       },
        //       quantity: 1,
        //     },
        // ],
        mode : "payment",
        customer: customer.id,  

        success_url :"http://localhost:5173/checkoutSuccess",
        cancel_url :"http://localhost:5173/checkoutCancel"
      })
  
      res.status(200).send({
        url: session.url,
      });
    } catch (error) {
        console.log(error);
      res.status(500).send({
        error: error.message,
      });
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
    DeleteCartProducts,
    productReviews,
    payment,
    getSingleproductReview,
    DeleteAllCartProducts,
    updateProductReviews,
    deleteProductReviews
}
