import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

dotenv.config()

const getMe = async (req, res) => {
	try {
		//
		const user = User.findById(req.userId)
		if (!user) {
			res.status(400).json({ message: 'Не съществува такъв потребител.' })
		}

		const JWT_SECRET = process.env.JWT_SECRET
		const token = jwt.sign(
			{
				id: user._id,
			},
			JWT_SECRET,
			{
				expiresIn: '30d',
			},
		)

		res.json({
			user,
			token,
		})
	} catch (e) {
		res.status(400).json({ message: 'Нямате достъп.' })
	}
}

export default getMe
