import express from "express";
import { commentGuide, createGuide, deleteGuide, getAllguides, getGuideById, getGuideDetails, getGuideDetailsWithAllUsers, getGuideInfo, getGuidesWithDetails, guideandNames, latestGuides, likeGuide, topRatedGuide, totGuideLikes, unlikeGuide, updateGuide } from "../Controllers/GuideController.js";
import protect from "../Middleware/authMidware.js"

const router = express.Router();

router.post("/add",createGuide);
router.get("/all",getAllguides);
router.put("/update/:id",updateGuide);
router.delete("/delete/:id", deleteGuide);
router.post("/like/:id",likeGuide);
router.post("/unlike/:id",protect,unlikeGuide);
router.post("/comment/:id",protect,commentGuide);
router.get("/latestGuides",latestGuides);
router.get("/topRated",topRatedGuide);
router.get("/totLikes/:id",totGuideLikes);
router.get("/getGuideDetails/:id",getGuideDetails);
router.get("/UsersWithComments/:id",getGuideDetailsWithAllUsers);
router.get("/guideandnames", guideandNames);
router.get("/getGuideInfo", getGuideInfo);
router.get("/getGuidesWithDetails",getGuidesWithDetails);
router.get("/getGuidebyId/:id", getGuideById);

export default router;