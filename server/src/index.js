import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { rateLimit } from 'express-rate-limit'
import deshboardRouter from "./routes/deshboard.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true  
}))

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})
app.use(limiter)

// Routes
app.get("/health", (req, res) => {
      res.status(200).json({ success: true, message: "Server is running 🎉" })
})

app.use("/api/v1/dashboard", deshboardRouter)

// 404 Catch-all (Standard handler)
app.use((req, res) => {
      res.status(404).json({ success: false, message: ` Route Not Found : ${req.method} ${req.url}` })
})

// Start server
const server = app.listen(Number(port), () => {
    console.log(`Server is running on  http://localhost:${port}`)
})

// Proper error and shutdown handling
server.on("error", (error) => {
      console.error("Server error:", error)
      process.exit(1)
})

process.on("SIGINT", () => {
      console.log("Server is shutting down")
      server.close(() => {
          console.log("Server closed")
          process.exit(0)
      })
})
