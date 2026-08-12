var _ = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return [];
	}

	const maxLike = Math.max(...blogs.map((blog) => blog.likes));
	return blogs.find((blog) => blog.likes === maxLike);
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return [];
	}

	const postCount = _.countBy(blogs, (blog) => blog.author);
	const objs = Object.entries(postCount).map(([author, posts]) => ({
		author,
		posts,
	}));
	return _.maxBy(objs, "posts");
};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return [];
	}

	const postCount = _.groupBy(blogs, (blog) => blog.author);
	const result = Object.entries(postCount).map(([author, likes]) => ({
		author,
		likes: _.sumBy(likes, "likes"),
	}));
	return _.maxBy(result, "likes");
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
