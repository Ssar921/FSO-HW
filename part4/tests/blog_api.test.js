const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	// Keeps saving is there is error in one save
	// let blogObject = helper.initialPosts.map((post) => new Blog(post));
	// const promiseArray = blogObject.map((post) => post.save());
	// await Promise.all(promiseArray);

	// Easier but rejects all if there is issue in one save
	await Blog.insertMany(helper.initialPosts);
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all posts are returned", async () => {
	const response = await helper.blogsInDb();

	assert.strictEqual(response.length, helper.initialPosts.length);
});

test("required post is within the returned posts", async () => {
	const response = await helper.blogsInDb();

	const postContent = response.map((e) => e.title);
	assert(postContent.includes("My First Blog Post"));
});

test("a new post can be added after refactoring", async () => {
	const newPost = {
		title: "async/await simplifies making async calls",
		author: "Async Await",
		url: "http://async-await.com",
		likes: 14,
	};

	await api
		.post("/api/blogs")
		.send(newPost)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await helper.blogsInDb();
	assert.strictEqual(response.length, helper.initialPosts.length + 1);

	const contents = response.map((r) => r.title);
	assert(contents.includes("async/await simplifies making async calls"));
});

test("a post without title will not be accepted", async () => {
	const newPost = {
		author: "Async Await",
		url: "http://async-await.com",
		likes: 14,
	};

	await api.post("/api/blogs").send(newPost).expect(400);

	const response = await helper.blogsInDb();
	assert.strictEqual(response.length, helper.initialPosts.length);
});

test("a specific post can be viewed", async () => {
	const response = await helper.blogsInDb();
	const firstPost = response[0];

	const dbPost = await api
		.get(`/api/blogs/${firstPost.id}`)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	assert.deepStrictEqual(firstPost, dbPost.body);
});

test("a post can be deleted", async () => {
	const response = await helper.blogsInDb();
	const postToDelete = response[0];

	await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);

	const finalPosts = await helper.blogsInDb();

	const ids = finalPosts.map((n) => n.id);
	assert(!ids.includes(postToDelete.id));

	assert.strictEqual(finalPosts.length, helper.initialPosts.length - 1);
});

test("posts have id instead of _id", async () => {
	const response = await helper.blogsInDb();
	response.forEach((post) => {
		assert(Object.keys(post).includes("id"));
	});
});

after(async () => {
	await mongoose.connection.close();
});
