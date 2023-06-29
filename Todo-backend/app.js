import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
//import bodyParser from 'body-parser';
import * as routes from "./Modules/index.routes.js";
import { connection } from "./DB/connection.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
const baseURL = "/api/v1";
connection();
app.use(`${baseURL}/todo`, routes.todosRoutes);
app.use(`${baseURL}/authTodo`, routes.authRoutes);

app.get("*", (req, res) => {
  res.json({ message: "invalid URL" });
});

app.listen(port, () => console.log(`.... app running on port ${port} .....`));
