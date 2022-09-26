const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clients");


router.route("/").get(clientController.clientsGet);

router.route("/:id").delete(clientController.clientsDelete);

router.route("/:id").put(clientController.clientsPut);

router.route("/").post(clientController.clientsPost);

module.exports = router;