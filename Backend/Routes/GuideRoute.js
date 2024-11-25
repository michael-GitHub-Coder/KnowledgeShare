import express from "express";
import { createGuide, deleteGuide, getAllguides, updateGuide } from "../Controllers/GuideController.js";
import protect from "../Middleware/authMidware.js"

const router = express.Router();

router.post("/add",protect,createGuide);
router.get("/all",getAllguides);
router.put("/update/:id",updateGuide);
router.delete("/delete/:id", deleteGuide);

export default router;