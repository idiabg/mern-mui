import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/auth.routes.js'
import registerValidation from './validations/register.validation.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'

// dotenv config
dotenv.config()

// constants
const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

// express start
const app = express()

// mongoose start
const startMongo = async () => {
	await mongoose
		.connect(
			`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.qpnra10.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
		)
		.then(() => {
			app.listen(PORT, (err) => {
				if (err) {
					console.log('Server error: ', err)
				}
				console.log(`Server started on port: ${PORT}...`)
			})
			console.log(`Connection to database "${DB_NAME}" is OK...`)
		})
		.catch((err) => {
			console.log('Connection to database fail: ', err)
		})
}

await startMongo()

// app uses
app.use(express.json())
app.use(cors())

// app routes
app.use('/api/auth', registerValidation, handleValidationErrors, router)
