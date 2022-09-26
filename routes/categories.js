const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");


router.route("/").get(categoriesController.categoriesGet);

router.route("/category/:id").get(categoriesController.categoryGet);

router.route("/:id").delete(categoriesController.categoryDelete);

router.route("/:id").put(categoriesController.categoryUpdate);

router.route("/").post(categoriesController.categoryCreate);

module.exports = router;