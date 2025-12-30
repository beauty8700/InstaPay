import express from "express";
import cors from "cors";
import conn from "./db.js";
import { router } from "./routes/server.js";
import { routers } from "./routes/Account.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/api", routers);
app.use("/api/v1/account", routers);

conn();

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
