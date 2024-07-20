import { Router } from "express";
import { check } from 'express-validator'
import { createForum, postMessage, deleteForum, deleteComment } from './forum.controller.js'

const router = Router();

router.post(
    '/',
    [
        
        check('title','The title indicates how the forum works.').not().isEmpty(),
        check('type','The type indicates what the type of problem is.').not().isEmpty(),    
    ], createForum
)

router.put(
    '/addMessage',
    [
        check('title', 'The title indicates where the comment belongs.').not().isEmpty(),
        check('user', 'The title indicates who wrote the comment.').not().isEmpty(),
        check('text', 'The text is requiredio').not().isEmpty(),
    ],
    postMessage
);

router.delete(
    '/:id',
    deleteForum
);

router.delete(
    '/:forumId/comments/:commentId',
    deleteComment
);

export default router;