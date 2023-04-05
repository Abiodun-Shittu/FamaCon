import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port  = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});
