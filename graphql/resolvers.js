const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const Post = require('../models/post');
const User = require('../models/user');
const checkAuth = require('../util/checkAuth');
const { clearImage } = require('../util/file');

module.exports = {
  Query: {
    login: async function (_, { email, password }) {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error('User not found.');
        error.code = 401;
        throw error;
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Password is incorrect.');
        error.code = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
        },
        'somesupersecretsecret',
        { expiresIn: '1h' }
      );
      return { token: token, userId: user._id.toString() };
    },
    posts: async (_, { page }, req) => {
      checkAuth(req);
      if (!page) {
        page = 1;
      }
      const perPage = 2;
      const totalPosts = await Post.find().countDocuments();
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage);
      return {
        posts: posts.map((p) => {
          return {
            ...p._doc,
            _id: p._id.toString(),
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
          };
        }),
        totalPosts: totalPosts,
      };
    },
    post: async function (_, { id }, req) {
      checkAuth(req);
      const post = await Post.findById(id).populate('creator');

      return {
        ...post._doc,
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };
    },
    user: async function (_, args, req) {
      checkAuth(req);
      const user = await User.findById(req.userId);
      return { ...user._doc, _id: user._id.toString() };
    },
  },
  Mutation: {
    createUser: async function (_, { userInput }, req) {
      const errors = [];
      if (!validator.isEmail(userInput.email)) {
        errors.push({ message: 'E-Mail is invalid.' });
      }
      if (
        validator.isEmpty(userInput.password) ||
        !validator.isLength(userInput.password, { min: 5 })
      ) {
        errors.push({ message: 'Password too short!' });
      }
      if (errors.length > 0) {
        const error = new Error('Invalid input.');
        error.data = errors;
        error.code = 422;
        throw error;
      }
      const existingUser = await User.findOne({ email: userInput.email });
      if (existingUser) {
        const error = new Error('User exists already!');
        throw error;
      }
      const hashedPw = await bcrypt.hash(userInput.password, 12);
      const user = new User({
        email: userInput.email,
        name: userInput.name,
        password: hashedPw,
      });
      const createdUser = await user.save();
      return { ...createdUser._doc, _id: createdUser._id.toString() };
    },
    createPost: async function (_, { postInput }, req) {
      checkAuth(req);
      const errors = [];
      if (
        validator.isEmpty(postInput.title) ||
        !validator.isLength(postInput.title, { min: 5 })
      ) {
        errors.push({ message: 'Title is invalid.' });
      }
      if (
        validator.isEmpty(postInput.content) ||
        !validator.isLength(postInput.content, { min: 5 })
      ) {
        errors.push({ message: 'Content is invalid.' });
      }
      if (errors.length > 0) {
        const error = new Error('Invalid input.');
        error.data = errors;
        error.code = 422;
        throw error;
      }
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error('Invalid user.');
        error.code = 401;
        throw error;
      }
      const post = new Post({
        title: postInput.title,
        content: postInput.content,
        imageUrl: postInput.imageUrl,
        creator: user,
      });
      const createdPost = await post.save();
      user.posts.push(createdPost);
      await user.save();
      return {
        ...createdPost._doc,
        _id: createdPost._id.toString(),
        createdAt: createdPost.createdAt.toISOString(),
        updatedAt: createdPost.updatedAt.toISOString(),
      };
    },
    updatePost: async function (_, { id, postInput }, req) {
      checkAuth(req);
      const post = await Post.findById(id).populate('creator');
      if (!post) {
        const error = new Error('No post found!');
        error.code = 404;
        throw error;
      }
      if (post.creator._id.toString() !== req.userId.toString()) {
        const error = new Error('Not authorized!');
        error.code = 403;
        throw error;
      }
      const errors = [];
      if (
        validator.isEmpty(postInput.title) ||
        !validator.isLength(postInput.title, { min: 5 })
      ) {
        errors.push({ message: 'Title is invalid.' });
      }
      if (
        validator.isEmpty(postInput.content) ||
        !validator.isLength(postInput.content, { min: 5 })
      ) {
        errors.push({ message: 'Content is invalid.' });
      }
      if (errors.length > 0) {
        const error = new Error('Invalid input.');
        error.data = errors;
        error.code = 422;
        throw error;
      }
      post.title = postInput.title;
      post.content = postInput.content;
      if (postInput.imageUrl !== 'undefined') {
        post.imageUrl = postInput.imageUrl;
      }
      const updatedPost = await post.save();
      return {
        ...updatedPost._doc,
        _id: updatedPost._id.toString(),
        createdAt: updatedPost.createdAt.toISOString(),
        updatedAt: updatedPost.updatedAt.toISOString(),
      };
    },
    deletePost: async function (_, { id }, req) {
      checkAuth(req);
      const post = await Post.findById(id);
      if (!post) {
        const error = new Error('No post found!');
        error.code = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId.toString()) {
        const error = new Error('Not authorized!');
        error.code = 403;
        throw error;
      }
      clearImage(post.imageUrl);
      await Post.findByIdAndRemove(id);
      const user = await User.findById(req.userId);
      user.posts.pull(id);
      await user.save();
      return true;
    },
    updateStatus: async function (_, { status }, req) {
      checkAuth(req);
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error('No user found!');
        error.code = 404;
        throw error;
      }
      user.status = status;
      await user.save();
      return { ...user._doc, _id: user._id.toString() };
    },
  },
  Post: {
    creator: async (parent, args, req) => User.findById(parent.creator),
  },
  User: {
    posts: async (parent, args, req) => Post.find({ creator: parent._id }),
  },
};
