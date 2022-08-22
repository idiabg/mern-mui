import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/user.model.js'

dotenv.config()

// Login user
const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })

		if (!user) {
			return res
				.status(400)
				.json({ message: 'Такъв потребител не съществува.' })
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: 'Грешна парола.' })
		}

		const JWT_SECRET = process.env.JWT_SECRET
		const token = jwt.sign(
			{
				id: user._id,
			},
			JWT_SECRET,
			{ expiresIn: '30d' },
		)

		res.json({
			token,
			user,
			message: 'Успешно влязохте в системата.',
		})
	} catch (e) {
		return res.status(400).json({ message: 'Грешка при авторизацията.' })
	}
}

export default login
