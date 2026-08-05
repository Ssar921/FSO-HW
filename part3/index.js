const express = require("express");
var morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (req) => {
	return JSON.stringify(req.body);
});
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body",
	),
);

let numbers = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
	{
		id: "44",
		name: "Deleter",
		number: "39rrr-23-6423122",
	},
];

app.get("/", (request, response) => {
	response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
	const info = `
    <p>Phonebook has info for ${numbers.length} people.</p>
    <p>${new Date()}</p>
    `;
	response.send(info);
});

app.get("/api/persons", (request, response) => {
	response.json(numbers);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const number = numbers.find((person) => person.id === id);

	if (number) {
		response.json(number);
	} else {
		response.statusMessage = "No number found";
		response.status(404).end();
	}
});

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name || !body.number) {
		response.statusMessage = "Missing name or number";
		return response.status(400).json({
			error: "Missing name or number",
		});
	}

	const exists = numbers.find(
		(number) => number.name.toLowerCase() === body.name.toLowerCase(),
	);

	if (exists) {
		return response.status(400).json({
			error: `Entry with ${body.name} already exists`,
		});
	}

	const genId = Math.floor(Math.random() * 10000);
	const number = {
		id: genId,
		name: body.name,
		number: body.number,
	};
	numbers.concat(number);
	response.json(number);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	numbers = numbers.filter((person) => person.id !== id);
	response.status(204).end;
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
