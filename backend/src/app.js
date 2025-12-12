import express from "express";
import { recipesRoutes } from "./routes/recipes.js";
import { userRoutes } from "./routes/users.js";
import { likeRoutes } from "./routes/likes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { handleSocket } from "./socket.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
recipesRoutes(app);
userRoutes(app);
likeRoutes(app);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

handleSocket(io);
// app.set("io", io)

export { server as app };

//export { app };
