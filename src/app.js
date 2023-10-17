const express = require("express");
const app = express();

// TODO: Follow instructions in the checkpoint to implement ths API.

const pastes = require('./data/pastes-data');

// Return one paste
app.use('/pastes/:pasteId', (req, res, next) => {
	const { pasteId } = req.params;
	const foundPaste = pastes.find(paste => paste.id === Number(pasteId));

	if (foundPaste) {
		res.json({ data: foundPaste });
	} else {
		next(`Paste id not found: ${pasteId}`);
	}
});

// Access to paste data
app.use('/pastes', (req, res) => {
	res.json({ data: pastes });
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
