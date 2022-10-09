const Router = require("express");
const userRouter = require("./userRouter.js");
const platformRouter = require("./platfromRouter.js");

const router = new Router();

router.use("/user", userRouter);
router.use("/platform", platformRouter);

module.exports = router;
