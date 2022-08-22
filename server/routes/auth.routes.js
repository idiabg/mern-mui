import { Router } from 'express'
import register from '../controllers/register.controller.js'
import login from '../controllers/login.controller.js'
import getMe from '../controllers/me.controller.js'

const router = new Router()

// register
// http://localhost/api/auth/register
router.post('/register', register)

// login
// http://localhost/api/auth/login
router.post('/login', login)

// get me
// http://localhost/api/auth/me
router.get('/me', getMe)

export default router
