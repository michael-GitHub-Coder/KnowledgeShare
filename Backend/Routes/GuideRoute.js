import express from "express";
import { createGuide, getAllguides, updateGuide } from "../Controllers/GuideController.js";
import protect from "../Middleware/authMidware.js"

const router = express.Router();

router.post("/add",createGuide);
router.get("/all",getAllguides);
router.put("/update",updateGuide);

export default router;