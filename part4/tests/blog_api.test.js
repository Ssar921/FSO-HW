const { test, describe, after, beforeEach } = require("node:test");
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

describe("GET BLOG TESTS:", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("all BLOGS are returned", async () => {
		const response = await helper.blogsInDb();

		assert.strictEqual(response.length, helper.initialPosts.length);
	});
});

describe("GET SPECIFIC BLOGS:", () => {
	test("required blog is within the returned blogs", async () => {
		const response = await helper.blogsInDb();

		const postContent = response.map((e) => e.title);
		assert(postContent.includes("My First Blog Post"));
	});

	test("a specific blog can be viewed", async () => {
		const response = await helper.blogsInDb();
		const firstPost = response[0];

		const dbPost = await api
			.get(`/api/blogs/${firstPost.id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert.deepStrictEqual(firstPost, dbPost.body);
	});

	test("blogs have id instead of _id", async () => {
		const response = await helper.blogsInDb();
		response.forEach((post) => {
			assert(Object.keys(post).includes("id"));
		});
	});
});

describe("POST REQUEST TESTS:", () => {
	test("a new blog can be added after refactoring", async () => {
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

	test("a blog without likes will default to 0 likes", async () => {
		const newPost = {
			title: "Zero Likes",
			author: "Mr Zero",
			url: "http://zero-likes.com",
		};

		const response = await api.post("/api/blogs").send(newPost).expect(201);
		assert.strictEqual(response.body.likes, 0);
	});

	test("a blog without title will not be accepted", async () => {
		const newPost = {
			author: "Lacks title",
			url: "http://lacks-title.com",
			likes: 14,
		};

		await api.post("/api/blogs").send(newPost).expect(400);

		const response = await helper.blogsInDb();
		assert.strictEqual(response.length, helper.initialPosts.length);
	});

	test("a blog without url will not be accepted", async () => {
		const newPost = {
			title: "Lacks URL",
			author: "URL Lacking",
			likes: 14,
		};

		await api.post("/api/blogs").send(newPost).expect(400);

		const response = await helper.blogsInDb();
		assert.strictEqual(response.length, helper.initialPosts.length);
	});

	test("a blog can be updated", async () => {
		const response = await helper.blogsInDb();
		const postToUpdate = response[0];

		const updateField = "likes";

		await api
			.put(`/api/blogs/${postToUpdate.id}`)
			.send({
				[updateField]: postToUpdate.likes + 1,
			})
			.expect(200);

		const finalPosts = await helper.blogsInDb();

		const updatedPost = finalPosts.find((n) => n.id === postToUpdate.id);

		assert.strictEqual(response[0].id, updatedPost.id);
		assert.notStrictEqual(
			postToUpdate[updateField],
			updatedPost[updateField],
		);
	});
});

test("a blog can be deleted", async () => {
	const response = await helper.blogsInDb();
	const postToDelete = response[0];

	await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);

	const finalPosts = await helper.blogsInDb();

	const ids = finalPosts.map((n) => n.id);
	assert(!ids.includes(postToDelete.id));

	assert.strictEqual(finalPosts.length, helper.initialPosts.length - 1);
});

after(async () => {
	await mongoose.connection.close();
});
