import express from 'express';

import { register, login } from '../Controllers/authController.js';

const router = express.Router();
router.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})
router.post('/register', register);
router.post('/login', login);

export default router
