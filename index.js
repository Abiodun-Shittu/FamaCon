import express from "express";
import dotenv from "dotenv";
import { connect } from "./src/Database/Db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect();

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
