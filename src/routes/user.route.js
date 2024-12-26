import epxress from 'express';
import { UserController }  from '../controllers/index.js';
import { validate } from '../middleware/validate.js';
import { UserValidation } from '../validations/user.validation.js';

const router = epxress.Router();

router.get('/', UserController.getAll);

router.get('/:id', UserController.getById);

router.post('/', validate(UserValidation.create.bodySchema), UserController.create);

router.patch('/:id', validate(UserValidation.update.bodySchema), UserController.update);

router.delete('/:id', UserController.delete)

export default router;