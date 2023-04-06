import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_URI } = process.env;

export const connect = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log("connection to Database has been established");
	} catch (error) {
		console.log("connection to Database has failed");
	}
};
