const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Root route (Serving index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Health check (Useful for render deployment)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Contact API: Store form submission data into PostgreSQL
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Debugging: Log the received data
    console.log("Received data:", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields required"
      });
    }

    const result = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    return res.status(200).json({
      success: true,
      message: "Saved successfully",
      data: result.rows[0]
    });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});