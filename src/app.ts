import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import currencyRoutes from "./routes/currencyRoutes";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3001;

// Use the cors middleware to enable CORS
app.use(cors());

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Other middleware and configurations...
app.use("/api/crypto", currencyRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
