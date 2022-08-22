import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

dotenv.config()

// Register user
const register = async (req, res) => {
	try {
		//
		const { firstName, lastName, email, password, avatar } = req.body
		const emailUsed = await User.findOne({ email })
		if (emailUsed) {
			return res.status(400).json({ message: 'Този email вече се изплзва.' })
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hash,
			avatar,
		})

		await newUser.save()

		const JWT = process.env.JWT_SECRET
		const token = jwt.sign(
			{
				id: newUser._id,
			},
			JWT,
			{ expiresIn: '30d' },
		)

		res.json({
			newUser,
			token,
			message: 'Регистрацията е успешна.',
		})
	} catch (e) {
		res.status(400).json({ message: 'Неуспешна регистрация.' })
	}
}

export default register
