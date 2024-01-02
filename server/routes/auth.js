import express from 'express'
import { signUp,signIn } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup',signUp)

router.post('/signin',signIn)

router.post('/google',)

export default router;
