import epxress from 'express';
import { NoteController } from '../controllers/index.js';
import { validate } from '../middleware/validate.js';
import { NoteValidation } from '../validations/note.validation.js';

const router = epxress.Router();

router.get('/', validate(NoteValidation.get.querySchema, 'query'), NoteController.getAll);

router.get('/:id', validate(NoteValidation.get.querySchema, 'query'), NoteController.getById);

router.post('/', validate(NoteValidation.create.bodySchema), NoteController.create);

router.put('/:id', validate(NoteValidation.update.bodySchema), NoteController.update);

router.delete('/:id', NoteController.delete);

export default router;