const { User , Blog } = require('../models');
const joi = require('joi');
// Joi ve diğer middleware'leri buraya import edebilirsiniz

// Joi schema for email validation
const emailSchema = joi.object({
    email: joi.string().email().required()
});

// Joi schema for username validation
const usernameSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required()
});

// Middleware functions for validation
const emailValidator = (req, res, next) => {
    const { error } = emailSchema.validate({ email: req.body.email });
    if (error) {
        console.log('wrong email');
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const usernameValidator = (req, res, next) => {
    const { error } = usernameSchema.validate({ username: req.body.username });
    if (error) {
        console.log('wrong username');
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const ValidatorList = [usernameValidator,emailValidator];

// Controller functions for user operations
const createUser = async (req, res) => {
    const { username, email } = req.body;

    try {
        // Veritabanına yeni bir kullanıcı kaydetme
        const newUser = await User.create({
            username,
            email
        });
        console.log('sucsess');
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getusersblog = async (userid) => {
    try {
        const blogs = await Blog.find({ userId: userid });
        return blogs;
    } catch (error) {
        console.error('Error fetching user blogs:', error);
        throw error; // Hata durumunda hatayı yöneten fonksiyona iletin
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        // ID'yi kullanarak kullanıcıyı bulma
        const user = await User.findById(id);
        console.log('success');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Kullanıcının bloglarını getirme işlemi
        const blogs = await getusersblog(user._id);
        
        // Render işlemi
        res.render('user', { user:user, blogs:blogs });
        
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Tüm kullanıcıları bulma
        const users = await User.find();
        console.log('sucsess');
        res.render('users' , {users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    ValidatorList
};
