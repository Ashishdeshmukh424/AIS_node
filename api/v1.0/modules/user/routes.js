const express = require("express");
const { Router } = express;
const router = new Router();
import { controller as api } from "./controller";
import { decryptRequest, validateAdmin, validateToken } from "../../../../middlewares";

router.post("/register", decryptRequest, api.register);
router.post("/login", decryptRequest, api.login);
router.patch("/change-password", validateToken, decryptRequest, api.changePassword);
router.post("/deactivate-user", validateToken, validateAdmin, decryptRequest, api.deactivateUser);
router.patch("/change-username", validateToken, decryptRequest, api.changeUsername);

module.exports = router;
