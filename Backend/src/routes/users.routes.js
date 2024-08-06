import { Router } from "express";
import { createNewResume, deleteResumeById, getResumeById, getResumeList, updateResume } from "../controllers/resume.controller.js";

const router   = Router();

router.route("/new").post(createNewResume);
router.route("/resumes").post(getResumeList);
router.route("/update-resume").put(updateResume);
router.route("/resumes/:id").get(getResumeById);
router.route("/resumes/delete/:id").delete(deleteResumeById);


export default router;