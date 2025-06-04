import express from 'express';
import { createProgram ,getPrograms,deleteProgram,getProgramById } from '../controllers/ProgramController.js';

const router = express.Router();



router.get("/", getPrograms);
router.post("/", createProgram);
router.delete("/:id", deleteProgram);
router.get("/:id", getProgramById);


export default router;
