const express = require('express');
const app = express();

const pastesRouter = require('./pastes/pastes.router');
const usersRouter = require('./users/users.router');

// Adding body property to the request
app.use(express.json());

// Pastes router
app.use('/pastes', pastesRouter);
// Users router
app.use('/users', usersRouter);

// Not found handler
app.use((req, res, next) => {
	next(`Not found: ${req.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
	console.error(error);
	const { status = 500, message = 'Something went wrong!' } = error;
	res.status(status).json({ error: message });
});

module.exports = app;
