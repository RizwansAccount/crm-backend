import express from "express";
import { ContactController } from "../controllers/index.js";
import { validate } from "../middleware/validate.js";
import { ContactValidation } from "../validations/contact.validation.js";

const router = express.Router();

router.get('/', ContactController.getAll);

router.get('/:id', ContactController.getById);

router.post('/', validate(ContactValidation.create.bodySchema), ContactController.create);

router.patch('/:id', validate(ContactValidation.update.bodySchema), ContactController.update);

router.delete('/:id', ContactController.delete)

export default router;