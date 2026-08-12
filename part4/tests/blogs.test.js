const { test, describe } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

const noPost = [];
const onePost = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
		likes: 5,
		__v: 0,
	},
];
const manyPosts = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

describe("dummy", () => {
	const blogs = [];
	const result = listHelper.dummy(blogs);

	test("will return 1", () => {
		assert.strictEqual(result, 1);
	});
});

describe("total likes for", () => {
	test("no posts will have 0 likes", () => {
		assert.strictEqual(listHelper.totalLikes(noPost), 0);
	});
	test("when list has only one blog, equals the likes of that", () => {
		assert.strictEqual(listHelper.totalLikes(onePost), 5);
	});
	test("when list has only many posts, equals the sum of those", () => {
		assert.strictEqual(listHelper.totalLikes(manyPosts), 36);
	});
});

describe("most likes for", () => {
	test("no post will be empty", () => {
		assert.deepStrictEqual(listHelper.favoriteBlog(noPost), []);
	});

	test("one post will be that post", () => {
		assert.strictEqual(listHelper.favoriteBlog(onePost), onePost[0]);
	});

	test("many posts will be the one with the most likes", () => {
		assert.strictEqual(listHelper.favoriteBlog(manyPosts), manyPosts[2]);
	});
});

describe("most posts for", () => {
	test("no post will be empty", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(noPost), []);
	});

	test("one post will be that author", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(onePost), {
			author: "Edsger W. Dijkstra",
			posts: 1,
		});
	});

	test("many posts will be the one with the most posts", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(manyPosts), {
			author: "Robert C. Martin",
			posts: 3,
		});
	});
});

describe("most liked author", () => {
	test("no post will be empty", () => {
		assert.deepStrictEqual(listHelper.mostLikes(noPost), []);
	});

	test("one post will be that author", () => {
		assert.deepStrictEqual(listHelper.mostLikes(onePost), {
			author: "Edsger W. Dijkstra",
			likes: 5,
		});
	});

	test("many posts will be the one with the most likes", () => {
		assert.deepStrictEqual(listHelper.mostLikes(manyPosts), {
			author: "Edsger W. Dijkstra",
			likes: 17,
		});
	});
});
