import express from "express";
import { AssignmentController } from "../controllers/index.js";

const router = express.Router();

router.get('/', AssignmentController.getAll);

router.get('/:id', AssignmentController.getById);

router.post('/', AssignmentController.create);

router.put('/:id', AssignmentController.update);

router.delete('/:id', AssignmentController.delete);

export default router;