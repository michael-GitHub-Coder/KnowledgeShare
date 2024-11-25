import express from "express";
import { commentGuide, createGuide, deleteGuide, getAllguides, latestGuides, likeGuide, unlikeGuide, updateGuide } from "../Controllers/GuideController.js";
import protect from "../Middleware/authMidware.js"

const router = express.Router();

router.post("/add",protect,createGuide);
router.get("/all",getAllguides);
router.put("/update/:id",updateGuide);
router.delete("/delete/:id", deleteGuide);
router.post("/like/:id",protect,likeGuide);
router.post("/unlike/:id",protect,unlikeGuide);
router.post("/comment/:id",protect,commentGuide);
router.get("/latestGuides",protect,latestGuides);
export default router;