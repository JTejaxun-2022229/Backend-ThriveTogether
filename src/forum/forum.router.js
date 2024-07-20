import { Router } from "express";
import { check } from 'express-validator'
import { createForum, postMessage, deleteForum, deleteComment, getForums, getComentaryById, updateForum } from './forum.controller.js'

const router = Router();

router.post(
    '/',
    [
        
        check('title','The title indicates how the forum works.').not().isEmpty(),
        check('type','The type indicates what the type of problem is.').not().isEmpty(),    
    ], createForum
)

router.get(
    '/',[],getForums
)

router.get(
    '/:forumId/comments/:commentId',
    [],
    getComentaryById
);

router.put(
    '/addMessage',
    [
        check('title', 'The title indicates where the comment belongs.').not().isEmpty(),
        check('user', 'The title indicates who wrote the comment.').not().isEmpty(),
        check('text', 'The text is requiredio').not().isEmpty(),
    ],
    postMessage
);

router.put('/:forumId', 
    [
        check('title', 'The title is required').not().isEmpty(),
        check('type', 'The type is required').not().isEmpty(),
    ],
    updateForum
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