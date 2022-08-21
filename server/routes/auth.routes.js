import { Router } from 'express'
import register from '../controllers/register.controller.js'

const router = new Router()

// register
// http://localhost/api/auth/register
router.post('/register', register)

// login
// http://localhost/api/auth/login

// get me
// http://localhost/api/auth/me

export default router
