import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT, validateRole } from '../middlewares/validate-jwt.js';
import { createPost, updatePost, deletePost } from './post.controller.js';
import { validarCampos } from '../middlewares/validate-fields.js';

const router = Router();

router.post(
    '/',
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        validarCampos
    ],
    createPost
);

router.put(
    '/:id',
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        validarCampos
    ],
    updatePost
);

router.delete(
    '/:id',
    [
        validateJWT,
        validateRole('ADMIN_ROLE')
    ],
    deletePost
);

export default router;