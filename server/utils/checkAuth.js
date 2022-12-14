import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.userId = decoded.id

			next()
		} catch (error) {
			return res.json({
				message: 'Нямате достъп.',
			})
		}
	} else {
		return res.json({
			message: 'Нямате достъп.',
		})
	}
}
