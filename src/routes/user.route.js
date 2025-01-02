import epxress from 'express';
import { UserController } from '../controllers/index.js';
import { validate } from '../middleware/validate.js';
import { UserValidation } from '../validations/user.validation.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { PERMISSION } from '../config/roles.js';

const router = epxress.Router();

router.get('/', authenticate, authorize(PERMISSION.view_all_user), UserController.getAll);

router.get('/:id', authenticate, authorize(PERMISSION.view_user), UserController.getById);

router.post('/', authenticate, authorize(PERMISSION.create_user), validate(UserValidation.create.bodySchema), UserController.create);

router.patch('/:id', authenticate, authorize(PERMISSION.update_user), validate(UserValidation.update.bodySchema), UserController.update);

router.delete('/:id', authenticate, authorize(PERMISSION.delete_user), UserController.delete)

router.post('/login', validate(UserValidation.login.bodySchema), UserController.login);

export default router;