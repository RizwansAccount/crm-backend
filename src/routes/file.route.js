import express from 'express';
import { FileController } from '../controllers/index.js';
import { uploadFile } from '../middleware/uploadFile.js';
import { validate } from '../middleware/validate.js';
import { FileValidation } from '../validations/file.validation.js';

const router = express.Router();

router.get('/', validate(FileValidation.get.querySchema, 'query'), FileController.getAll);

router.get('/:id', validate(FileValidation.get.querySchema, 'query'), FileController.getById);

router.post('/', uploadFile.array("files", 5), validate(FileValidation.create.bodySchema), FileController.createMany);

router.put('/:id', uploadFile.single('file'), validate(FileValidation.update.bodySchema), FileController.update);

router.delete('/:id', FileController.delete);

export default router;