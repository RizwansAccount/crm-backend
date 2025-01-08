import express from "express";
import { AssignmentController } from "../controllers/index.js";
import { validate } from "../middleware/validate.js";
import { AssignmentValidation } from "../validations/assignment.validation.js";

const router = express.Router();

router.get('/', validate(AssignmentValidation.get.querySchema, 'query'), AssignmentController.getAll);

router.post('/', validate(AssignmentValidation.create.bodySchema), AssignmentController.createAndUpdate);

router.delete('/remove-assign', validate(AssignmentValidation.delete.bodySchema), AssignmentController.delete);

export default router;