// routes/modelRoutes.js
import express from "express";
import multer from "multer";
import { createModel, getModels ,deleteModel, updateModel,} from "../controllers/modelController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createModel);
router.get("/", getModels);
router.delete("/:id", deleteModel);
router.put("/:id", upload.single("image"), updateModel);

export default router;
