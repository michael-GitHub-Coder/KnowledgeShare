import express from "express";
import protect from "../Middleware/authMidware.js"
import { DeactivateUser,activateUser, createUser, deleteUser, getUser, updateUser, userAuth } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/auth",userAuth);
router.post("/add", createUser);
router.get("/all",getUser);
router.put("/update/:id",updateUser);
router.put("/deactivate/:id",DeactivateUser);
router.put("/activate/:id",activateUser);
router.delete("/delete/:id",deleteUser);

export default router;