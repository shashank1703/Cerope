const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require("cors");

const cors = require("cors");

// ✅ Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware for parsing request bodies
app.use(bodyParser.json());


// const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
// app.use(bodyParser.json());
// app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});