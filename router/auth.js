import express from 'express';
import {body} from 'express-validator';
import * as authController from '../controller/auth.js';
import {validate} from '../middleware/validator.js';


const router = express.Router();

const validateSignup = [
    body('username').trim().isLength({min:3}).withMessage('아이디는 3글자 이상이어야 합니다'),
    body('password').trim().isLength({min:4}).withMessage('비밀번호는 5글자 이상이어야 합니다'),
    body('email').isEmail().withMessage('이메일 형식이 올바르지 않습니다'),
]

router.post('/signup', validateSignup, authController.signup);

router.post('/login', authController.login);

router.get('/me', authController.verify)

export default router;