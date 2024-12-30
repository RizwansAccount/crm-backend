import express from "express";
import { ContactController } from "../controllers/index.js";
import { validate } from "../middleware/validate.js";
import { ContactValidation } from "../validations/contact.validation.js";
import { authorize } from "../middleware/authorize.js";
import { PERMISSION } from "../config/roles.js";

const router = express.Router();

router.get('/', authorize(PERMISSION.view_all_contact), ContactController.getAll);

router.get('/:id', authorize(PERMISSION.view_contact), ContactController.getById);

router.post('/', authorize(PERMISSION.create_contact), validate(ContactValidation.create.bodySchema), ContactController.create);

router.patch('/:id', authorize(PERMISSION.update_contact), validate(ContactValidation.update.bodySchema), ContactController.update);

router.delete('/:id', authorize(PERMISSION.delete_contact), ContactController.delete);

export default router;