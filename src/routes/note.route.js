import epxress from 'express';
import { NoteController } from '../controllers/index.js';

const router = epxress.Router();

router.get('/', NoteController.getAll);

router.get('/:id', NoteController.getById);

router.post('/create', NoteController.create);

router.patch('/:id', NoteController.update);

router.delete('/:id', NoteController.delete);

export default router;