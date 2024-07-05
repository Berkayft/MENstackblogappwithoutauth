const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Blogları listeleme
router.get('/', blogController.listBlogs);

// Yeni blog oluşturma sayfası
router.get('/newblog', blogController.newBlogPage);

// Yeni blog oluşturma
router.post('/newblog', blogController.titleValidator, blogController.createNewBlog);

// Belirli bir blogu görüntüleme
router.get('/list/:id', blogController.viewBlog);

module.exports = router;
