import express from "express";
import { LeadController } from "../controllers/index.js";
import { validate } from "../middleware/validate.js";
import { ContactValidation } from "../validations/contact.validation.js";
import { authorize } from "../middleware/authorize.js";
import { PERMISSION } from "../config/roles.js";

const router = express.Router();

router.get('/', authorize(PERMISSION.view_all_lead), LeadController.getAll);

router.get('/:id', authorize(PERMISSION.view_lead), LeadController.getById);

router.post('/', authorize(PERMISSION.create_lead), validate(ContactValidation.create.bodySchema), LeadController.create);

router.patch('/:id', authorize(PERMISSION.update_lead), validate(ContactValidation.update.bodySchema), LeadController.update);

router.delete('/:id', authorize(PERMISSION.delete_lead), LeadController.delete);

export default router;