import express from 'express';
import { register, login, getUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);  // POST /api/auth/register
router.post('/signup', register);    // POST /api/auth/signup (alias for compatibility)
router.post('/login', login);        // POST /api/auth/login
router.get('/users', getUsers);      // GET /api/auth/users

export default router;
