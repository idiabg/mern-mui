import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

//
const login = async (req, res) => {
	try {
		const {email, password} = req.body
		const userExist = await User.findOne({email})

	} catch (e) {
		//const {email, password} = req.body
	}
}

export default login