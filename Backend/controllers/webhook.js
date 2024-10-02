const Sequelize = require("sequelize")
require('dotenv').config()

const Op = Sequelize.Op
const Product = require("../models").Product
const Categories = require("../models").categories
const Cart = require("../models").Cart
const User = require("../models").User
const CartItem = require("../models").CartItem
const ProductReview = require("../models").ProductReview
const OrderDetail = require("../models").OrderDetail
const Order = require("../models").Order
const stripe = require("stripe")(process.env.STRIPE_SCRETE_KEY);
const express = require("express")
const { v4: uuidv4 } = require("uuid");
const axios = require("axios")

const addOrder =async  (customer,data)=>{
    try {
        const userId =  customer.metadata.userId;
        const checkCartItems =  await CartItem.findAll({
           
            include :[
            {  model : Cart ,
              where: {
                  user_id : userId
                }
              },
            {
                  model: Product
            }
          ],
           
      })
console.log(
   "adskkladskl;adsl;kal;sdkl;kads;klads;kl",   checkCartItems
)
   

      const createOrder = await Order.create({
        user_id : userId,
        shipping_address : data.customer_details,
        payment_status :  data.payment_status,
        total_amount : data.amount_total/100,
        createAt : new Date(),
        updateAt : new Date()
        
      })

      console.log("Processed Order:", createOrder);

      const order = checkCartItems.map(ele=>  {
        return OrderDetail.create({
            order_id : createOrder.id,
        product_id:  ele.product_id,
        quantity:  ele.quantity,
        price : ele.Product.price,
        createAt : new Date(),
        updateAt : new Date()
        })
      })
      console.log(
        "order {",   order
     )
     await Promise.all(order);

    } catch (error) {
        console.log(error);
    }
}




const stripeWebhook = (request, response) => {
    let data;
    let eventType;
    let event;
    console.log("stripeWebhook================================");
    
    const endpointSecret = "whsec_42432a9965401b2a00ea7c668f5fb083175c335090d895352d543b804ec847db";
    // const endpointSecret = "whsec_q5mkwfnJJozua8JEZgVwRKH35nU3Rk62";
    if(endpointSecret){
    const sig = request.headers['stripe-signature'];

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log("webhook sucess", event);
} catch (err) {
      console.log("webhook error", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object;
  eventType = event.type;
  console.log(data);
}else{
          // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
}
  // Handle the event
  if (eventType === "checkout.session.completed") {

    stripe.customers
    .retrieve(data.customer)
    .then(async (customer) => {
      try {
        addOrder(customer,data)
       const id  = customer.metadata.userId
       console.log("id--------", id)
       if(id){

         const apiUrl = `${process.env.API}/v2/product/DeleteAllCartProducts/user/${id}`;
         console.log("apiurl---", apiUrl);
         
       const response = await axios.delete(apiUrl);

       console.log("response{{{{{{",response.data)
        }else{
          console.log("id not ound")
        }

     console.log("customer---------------",customer);
     console.log("data12211212", data);

      } catch (err) {
        console.log(typeof createOrder);
        console.log(err);
      }
    })
    .catch((err) => console.log(err.message));

  }
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};

module.exports = {
    stripeWebhook

}
