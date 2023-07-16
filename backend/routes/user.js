import express from "express";

const router = express.Router();

import * as controller from '../controllers/user.js';
import { isAuthenticated } from "../middlewares/auth.js";

router.get("/all", controller.getAllUser);

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
// Way 1 : using cookies 
// router.get("/profile", controller.getByProfile);

// Way 2 : using middlware 
router.get("/profile", isAuthenticated ,controller.getByProfile);

export default router;