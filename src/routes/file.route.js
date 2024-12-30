import express from 'express';
import { FileController } from '../controllers/index.js';
import { uploadFile } from '../middleware/uploadFile.js';
import { validate } from '../middleware/validate.js';
import fileValidation from '../validations/file.validation.js';

const router = express.Router();

router.get('/', FileController.getAll);

router.get('/:id', FileController.getById);

router.post('/', uploadFile.array("files", 5), validate(fileValidation.create.bodySchema), FileController.createMany);

router.patch('/:id', uploadFile.single('file'), validate(fileValidation.update.bodySchema), FileController.update);

router.delete('/:id', FileController.delete);

export default router;