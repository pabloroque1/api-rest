const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.route("/").get(productsController.productsGet);

router.route("/product/:id").get(productsController.productGet);

router.route("/:id").put(productsController.productUpdate);

router.route("/").post(productsController.productCreate);

module.exports = router;