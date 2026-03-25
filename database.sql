-- Create the database (Run this manually in PostgreSQL first if you haven't created one)
-- CREATE DATABASE portfolio_db;

-- Connect to your database
-- \c portfolio_db;

-- Create the messages table for the contact form
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
