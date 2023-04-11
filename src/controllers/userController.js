import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const salt = Number(process.env.HASH_SALT);

// Create a new User
export const createUser = async (req, res) => {
	try {
		const { name, email, password, profile_picture, user_type } = req.body;
		const checkEmailExists = await User.findOne({ email });
		if (checkEmailExists) {
			return res.status(404).json({ message: "Email already exists" });
		}
		// hash the password
		const passwordHash = await bcrypt.hash(password, salt);
		const newUser = await User.create({
			name,
			email,
			password: passwordHash,
			profile_picture,
			user_type,
		});
		return res
			.status(201)
			.json({ message: "User created successfully", data: newUser });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "System Error, please contact the administrator",
		});
	}
};