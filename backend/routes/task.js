import express  from "express";
const router = express.Router();

import * as controller from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/new", isAuthenticated, controller.newTask); 

router.get("/all", isAuthenticated, controller.getAllTask);

// Dynamic URL
router.route("/:id")
    .put(isAuthenticated, controller.updateTask)
    .delete(isAuthenticated, controller.deleteTask)

export default router;