const Router = require("express");
const platformController = require("../controllers/platformController");

const router = new Router();

router.post("/getTasks", platformController.getTasks);

module.exports = router;
