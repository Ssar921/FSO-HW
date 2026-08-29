const Blog = require("../models/blog");
const User = require("../models/user");

const initialPosts = [
	{
		title: "My First Blog Post",
		author: "Shafaq Sarfraz",
		url: "http://blogspot.com",
		likes: 24,
		user: "6a9164bc3e3f67ac956e68f4",
	},
	{
		title: "The Next Blog Post",
		author: "Aliza Khan",
		url: "http://blogspot-aliza.com",
		likes: "13",
		user: "6a8e8d9d067aa71a420fd69f",
	},
	{
		title: "Third  Post",
		author: "Jack Khan",
		url: "http://liza.com",
		likes: "13",
		user: "6a8e8d9d067aa71a420fd69f",
	},
];

const nonExistingId = async () => {
	const blog = new Blog({ title: "willremovethissoon" });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = {
	initialPosts,
	nonExistingId,
	blogsInDb,
	usersInDb,
};
