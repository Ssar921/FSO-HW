const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose.set("strictQuery", false);
mongoose
	.connect(url, { family: 4 })
	.then((result) => {
		console.log("connection successful");
	})
	.catch((error) => {
		console.log("error connecting to db", error.message);
	});

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});
personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Person", personSchema);
