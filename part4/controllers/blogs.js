const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
	const authorization = request.get("authorization");
	if (authorization && authorization.startsWith("Bearer ")) {
		return authorization.replace("Bearer ", "");
	}
	return null;
};

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
	// const blog = new Blog(request.body);
	const body = request.body;

	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: "token invalid" });
	}
	const user = await User.findById(decodedToken.id);

	// const user = await User.findById(body.userId);

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
	await Blog.findByIdAndDelete(request.params.id);
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
