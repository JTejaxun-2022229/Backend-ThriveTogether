import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT, validateRole, compareUser } from '../middlewares/validate-jwt.js';
import { getUsers, getUserById, updateUser, deleteUser, updateUserProgressById, getUsersByRoleSupporter, getUsersByRoleUser } from './user.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get(

    '/',
    [
        validateJWT,
        validateRole('ADMIN_ROLE'),
        validarCampos
    ],
    getUsers
);

router.get(

    '/profile',
    [
        validateJWT,
        validarCampos
    ],
    getUserById
);

router.get(

    '/patients',
    [
        validateJWT,
        validateRole('ADMIN_ROLE', 'SUPPORTER_ROLE'),
        validarCampos
    ],
    getUsersByRoleUser
);

router.get(

    '/profesionalSupport',
    [
        validateJWT,
        validarCampos
    ],
    getUsersByRoleSupporter
);

router.put(

    '/profile',
    [
        validateJWT,
        check('name', 'The name cannot be empty').optional().not().isEmpty(),
        check('username', 'The username cannot be empty').optional().not().isEmpty(),
        check('email', 'The email must be a valid email').optional().isEmail(),
        check('password', 'The password cannot be empty').optional().isLength({ min: 8 }),
        validarCampos
    ],
    updateUser
);

router.patch(

    '/patient/:id',
    [
        validateJWT,
        validateRole('ADMIN_ROLE', 'SUPPORTER_ROLE'),
        check('progress', 'Progress is required').not().isEmpty(),
        validarCampos
    ],
    updateUserProgressById
);

router.delete(
    '/profile',
    [
        validateJWT
    ],
    deleteUser
);

export default router;