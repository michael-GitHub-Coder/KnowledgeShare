import express from "express";
import { createUser, deleteUser, getUser, updateUser, userAuth } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/auth",userAuth);
router.post("/add", createUser);
router.get("/all",getUser);
router.put("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);

export default router;