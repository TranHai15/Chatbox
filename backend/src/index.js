const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const routerHome = require("./routes/aiRouter");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const port = 5000;
app.use(express.json());
app.use(cors());

routerHome(app);

io.on("connection", (socket) => {
  console.log("Người dùng kết nối", socket.id);

  socket.on("send_message", async (message) => {
    const response = await require("./controllers/aiController").processMessage(
      message
    );
    socket.emit("receive_message", response);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
