import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { ConflictException } from "../exceptions/conflictException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { UnauthorizedException } from "../exceptions/unauthorizedException.js";
import { ForbiddenException } from "../exceptions/forbiddenException.js";
dotenv.config();

const salt = Number(process.env.HASH_SALT);
const secret_key = process.env.SECRET;

// Create a new User
export const createUser = async (req, res, next) => {
	try {
		const { name, email, password, profile_picture, user_type } = req.body;
		const checkEmailExists = await User.findOne({ email });
		if (checkEmailExists) {
			throw new ConflictException("Email already exists");
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
		const token = JWT.sign(
			{ id: newUser._id, name: newUser.name, email: newUser.email },
			secret_key
		);
		return res.status(201).json({
			message: "User created successfully",
			data: newUser,
			token,
		});
	} catch (error) {
		console.log(`Error creating user: ${error.message}`);
		next(error);
	}
};

// Login the user
export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new NotFoundException("User does not exist");
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new UnauthorizedException("Invalid email or password");
		}
		const token = JWT.sign(
			{ id: user._id, name: user.name, email: user.email },
			secret_key
		);
		return res.status(200).json({
			message: "User logged in successfully",
			data: user,
			token,
		});
	} catch (error) {
		console.log(`Error logging in User: ${error.message}`);
		next(error);
	}
};

// Fetch the user
export const getUser = async (req, res, next) => {
	try {
		const { userId } = req.params;

		const findUser = await User.findById(userId);
		if (!findUser) {
			throw new NotFoundException("User not found");
		}

		return res
			.status(200)
			.json({ message: "User retrieved successfully", data: findUser });
	} catch (error) {
		console.log(`Error fetching user: ${error.message}`);
		next(error);
	}
};

// Update the user
export const updateUser = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const findUser = await User.findById(userId);
		if (!findUser) {
			throw new NotFoundException("User not found");
		}
		if (req.user.id !== findUser._id.toString()) {
			throw new ForbiddenException(
				"You are not allowed to access this page"
			);
		}
		const { name, email, password, profile_picture } = req.body;
		let hashPassword;
		if (password) {
			hashPassword = await bcrypt.hash(password, salt);
		}

		findUser.name = name || findUser.name;
		findUser.email = email || findUser.email;
		findUser.password = hashPassword || findUser.password;
		findUser.profile_picture = profile_picture || findUser.profile;

		await findUser.save();

		return res
			.status(200)
			.json({ message: "User updated successfully", data: findUser });
	} catch (error) {
		console.log(`Error updating user: ${error.message}`);
		next(error);
	}
};
