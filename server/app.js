// Import
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

// Rate Limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10,
    message: { error: 'Too many requests, please try again later.' }
})

// Middleware
app.use(helmet())
// app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
const userRouter = require("./routes/userRouter");
const blogsRouter = require("./routes/blogsRouter");
const authRouter = require("./routes/authRouter")

app.use('/api/auth', authLimiter)
app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/auth", authRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')))
}

module.exports = app