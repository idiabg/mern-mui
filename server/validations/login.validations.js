import { body } from 'express-validator'

const loginValidation = [
	body('email', 'Грешен email формат.').isEmail(),
	body('password', 'Паролата трябва да е по-дълга от пет знака.').isLength({
		min: 5,
	}),
]

export default loginValidation
