const express = require("express");
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  res.send("Hello v1.0 GET API");
});

router.use("/user", require("./modules/user/routes"));

module.exports = router;
