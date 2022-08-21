import { body } from 'express-validator'

const registerValidation = [
	body('firstName', 'Името трябва да е по-дълго от два знака.').isLength({
		min: 2,
	}),
	body('lastName', 'Фамилията трябва да е по-дълга от два знака.').isLength({
		min: 2,
	}),
	body('email', 'Грешен email формат.').isEmail(),
	body('password', 'Паролата трябва да е по-дълга от пет знака.').isLength({
		min: 5,
	}),
	body('avatar', 'Грешен формат на връзката.').optional().isURL(),
]

export default registerValidation
