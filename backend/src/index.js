const express = require("express");

const cors = require("cors");
const app = express();
const port = 5000;
// Middleware để xử lý JSON
app.use(express.json());

// Sử dụng cors
app.use(
  cors({
    origin: "http://localhost:5173", // Địa chỉ frontend của bạn
    methods: "GET,POST",
    credentials: true,
  })
);

const routerHome = require("./router/RouterHome");
routerHome(app);
app.listen(port, () => {
  console.log(`server cua ban dang chay o cong http://localhost:${port} `);
});
