const { User, Blog } = require('../models');
const Joi = require('joi');

// Joi şema doğrulaması
const blogSchema = Joi.object({
    username: Joi.string().required(),
    title: Joi.string().max(30).required(),
    content: Joi.string().required()
});

const titleValidator = (req, res, next) => {
    const { error } = blogSchema.validate(req.body); // req.body'nin tamamını doğruluyoruz
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Kullanıcı bulma fonksiyonu
const UserFinder = async (username) => {
    const user = await User.findOne({ username: username });
    if (user) {
        return user;
    } else {
        throw new Error('User not found');
    }
};

const Userfindbyblog = async (blog) => {
    const user_id = blog.userId;
    const user = await User.findById(user_id);
    return user;
};

// Tüm blogları listeleme
const listBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.render('blogs', { blogs });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Yeni blog oluşturma sayfası
const newBlogPage = (req, res) => {
    res.render('newblog');
};

// Yeni blog oluşturma
const createNewBlog = async (req, res) => {
    console.log('Post request received');
    try {
        console.log(req.body.username);
        const user = await UserFinder(req.body.username);
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            userId: user._id,
        });
        res.status(201).json(newBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Belirli bir blogu görüntüleme
const viewBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        const user = await Userfindbyblog(blog);
        res.render('blog', { blog, user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    titleValidator,
    listBlogs,
    newBlogPage,
    createNewBlog,
    viewBlog
};
