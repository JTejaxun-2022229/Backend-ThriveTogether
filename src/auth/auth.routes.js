import { Router } from 'express';
import { check } from 'express-validator';
import { registerUser, login } from './auth.controller.js';
import { existUsername, existeEmail, isStatusValid } from '../helpers/user-validators.js';
import { validarCampos } from '../middlewares/validate-fields.js';

const router = Router();

router.post(
    
    '/register',
    [
        check('name', 'The name cannot be empty').not().isEmpty(),
        check('username', 'The username cannot be empty').not().isEmpty(),
        check('username').custom(existUsername),
        check('email', 'The email must be a valid email').isEmail(),
        check('email').custom(existeEmail),
        check('password', 'The password cannot be empty').not().isEmpty().isLength({ min: 8 }),
        validarCampos
    ],
    registerUser
);

router.post(

    '/login',
    [
        check('email', 'The email must be a valid email').isEmail(),
        check('password', 'The password cannot be empty').not().isEmpty(),
        validarCampos
    ],
    login
);

export default router;