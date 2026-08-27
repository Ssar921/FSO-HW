const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
	const body = request.body;
	const user = request.user;

	if (!user) {
		return response
			.status(400)
			.json({ error: "userId missing or not valid" });
	}

	const post = new Blog({
		user: user._id,
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
	});

	const result = await post.save();

	user.blogs = user.blogs.concat(result._id);
	await user.save();

	response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
	const user = request.user;
	const blog = await Blog.findById(request.params.id);

	if (blog.user.toString() === user._id.toString()) {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} else {
		return response.status(401).json({ error: "unauthorized" });
	}
});

blogsRouter.get("/del", async (request, response) => {
	await Blog.deleteMany({});
	response.status(204).end();
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.put("/:id", async (request, response) => {
	const newPerson = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		{
			returnDocument: "after",
		},
	);
	response.json(newPerson);
});

module.exports = blogsRouter;
