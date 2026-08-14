const Blog = require("../models/blog");

const initialPosts = [
	{
		title: "My First Blog Post",
		author: "Shafaq Sarfraz",
		url: "http://blogspot.com",
		likes: 24,
	},
	{
		title: "The Next Blog Post",
		author: "Aliza Khan",
		url: "http://blogspot-aliza.com",
		likes: "13",
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

module.exports = {
	initialPosts,
	nonExistingId,
	blogsInDb,
};
