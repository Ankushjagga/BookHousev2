const express = require("express")
const router =  express.Router();
const productRouter = require("../controllers/product");

router.get("/allProduct", productRouter.getAllProduct);
router.get("/getRandomProduct", productRouter.getRandomProduct);
router.get("/getLatestProduct", productRouter.getLatestProduct);
router.get("/getAllCategories", productRouter.getAllCategories);
router.get("/getProductsByCategory/:category", productRouter.getProductsByCategory);
router.get("/getSingleProduct/:id", productRouter.getSingleProduct);
router.post("/addToCart/user/:userId/products/:productId", productRouter.addToCart);
router.get("/totalItemsInCart/cart/:cartId", productRouter.totalItemsInCart);
router.get("/cartProducts/user/:userId", productRouter.cartProducts);
router.delete("/DeleteCartProducts/product/:productId/user/:userId", productRouter.DeleteCartProducts);


module.exports = router 