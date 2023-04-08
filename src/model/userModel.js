import {Schema, model} from "mongoose";


const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile_picture: {
			type: String,
		},
		user_type: {
			type: String,
			enum: ["vendor", "customer"],
		},
	},
	{ timestamps: true }
);

const User = model('User', userSchema)

export default User;