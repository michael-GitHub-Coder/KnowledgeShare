import express from "express";
import protect from "../Middleware/authMidware.js"
import { DeactivateUser,activateUser, createUser, deleteUser, getUser, getUserByEmail, suspendAccount, updateUser, userAuth } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/auth",userAuth);
router.post("/add", createUser);
router.get("/all",protect,getUser);
router.put("/update/:id",protect,updateUser);
router.put("/deactivate/:id",protect,DeactivateUser);
router.put("/activate/:id",protect,activateUser);
router.get("/getUserbyemail",protect,getUserByEmail);
router.put("/suspend/:id",suspendAccount);
// router.delete("/delete/:id",deleteUser);

export default router;