const express = require("express");
const { Router } = express;
const router = new Router();

router.use("/v1.0", require("./v1.0"));

module.exports = router;
