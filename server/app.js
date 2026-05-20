// Import
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// Use
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
const userRouter = require("./routes/userRouter");
const blogsRouter = require("./routes/blogsRouter");
const authRouter = require("./routes/authRouter")

app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')))
}

module.exports = app