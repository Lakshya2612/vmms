import { Router } from "express";
import { verifyJwt, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
  submitapplication,
  getallapplication,
} from "../controllers/application.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/getallapplication")
  .get(verifyJwt, authorizeRoles("admin"), getallapplication);
router.route("/submitapplication/:jobId").post(
  verifyJwt,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  submitapplication
);

export default router;
