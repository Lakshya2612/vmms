import { Router } from "express";
import {
  createjob,
  getalljobs,
  updateJob,
  deleteJob,
} from "../controllers/jobs.controller.js";

import { verifyJwt, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getalljobs").get(getalljobs);
router.route("/createjob").post(verifyJwt, authorizeRoles("admin"), createjob);
router
  .route("/updatejob/:jobId")
  .put(verifyJwt, authorizeRoles("admin"), updateJob);
router
  .route("/deletejob/:jobId")
  .delete(verifyJwt, authorizeRoles("admin"), deleteJob);

export default router;
