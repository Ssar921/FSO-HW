require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const Person = require("./models/person");

const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.json());

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
	// response.json(numbers);
	Person.find({}).then((people) => {
		response.json(people);
	});
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.statusMessage = `cant find ${id}`;
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
	// .catch((error) => {
	// 	console.log(error);
	// 	response.status(400).send({ error: "malformatted id" });
	// });

	// const number = numbers.find((person) => person.id === request.params.id);
	// if (number) {
	// 	response.json(number);
	// } else {
	// 	response.statusMessage = "No number found";
	// 	response.status(404).end();
	// }
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
		// return response.status(400).json({
		// 	error: `Entry with ${body.name} already exists`,
		// });
		Person.findById(request.params.id)
			.then((person) => {
				if (!person) {
					return response.status(404).end();
				}

				person.name = body.name;
				person.number = body.number;

				return person.save().then((updatedPerson) => {
					response.json(updatedPerson);
				});
			})
			.catch((error) => next(error));
	}

	// const genId = Math.floor(Math.random() * 10000);
	// const number = {
	// 	id: genId,
	// 	name: body.name,
	// 	number: body.number,
	// };
	// numbers.concat(number);

	const person = new Person({
		name: body.name,
		number: body.number,
	});
	person.save().then((savedPerson) => response.json(savedPerson));
});

app.put("/api/persons/:id", (request, response, next) => {
	const { name, number } = request.body;

	Person.findById(request.params.id)
		.then((person) => {
			if (!person) {
				return response.status(404).end();
			}

			person.name = name;
			person.number = number;

			return person.save().then((updatedPerson) => {
				response.json(updatedPerson);
			});
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	// const id = request.params.id;
	// numbers = numbers.filter((person) => person.id !== id);
	// response.status(204).end;

	Person.findByIdAndDelete(request.params.id)
		.then((result) => {
			response.json(result);
			// response.status(204).end();
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
