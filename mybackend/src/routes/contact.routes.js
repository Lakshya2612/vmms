import { Router } from "express";
import { verifyJwt, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  submitquery,
  getallqueries,
} from "../controllers/contactus.controller.js";

const router = Router();

router
  .route("/getallqueries")
  .get(verifyJwt, authorizeRoles("admin"), getallqueries);
router.route("/contactus").post(verifyJwt, authorizeRoles("user"), submitquery);

export default router;
