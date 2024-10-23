Expense Tracker API
This is a RESTful API for tracking expenses and income, built using Node.js, Express, and SQLite. It provides user authentication, allows users to categorize transactions as income or expense, and generates summaries based on transaction data.

Features
User Authentication: Register and log in users using JWT tokens.
Transaction Management: Add, update, delete, and view transactions.
Category Management: Create and retrieve income and expense categories.
Summary: View a summary of income, expenses, and balance.


Table of Contents
Features
Requirements
Setup and Installation
API Documentation
Authentication Endpoints
Category Endpoints
Transaction Endpoints
Summary Endpoints
Middleware


Table of Contents
Features
Requirements
Setup and Installation
API Documentation
Authentication Endpoints
Category Endpoints
Transaction Endpoints
Summary Endpoints
Middleware

Setup and Running
git clone https://github.com/Gopi0709/Floww.ai-Nodejs-Assignment/
cd Assignment

Install Dependencies
npm install

Set Up the SQLite Database The app uses SQLite, and you'll need to create the database tables for users, categories, and transactions. You can create them by running the SQL queries found in the dbSetup.js file, or manually create the tables using the following commands:

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL
);

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
);


Run the Application

docker compose up --build

Testing the API Use tools like Postman or cURL to test the API endpoints. For authentication and protected routes, you will need to include the JWT token in the Authorization header.

