const express = require('express');
const router = express.Router();
const { createUser, getUserById, getAllUsers , ValidatorList} = require('../controllers/userController');

// Middleware ve diğer gereksinimler buraya eklenebilir

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Rotaları controller'dan yönlendirme
router.get('/create', (req, res) => {
    console.log('hi bosss')
    res.render('newuser');
});

router.post('/create', ValidatorList, createUser);

router.get('/list/:id', getUserById);

router.get('/all', getAllUsers);

module.exports = router;
