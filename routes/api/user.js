const {Router} = require('express');
const {check} = require('express-validator');
const {register} = require('../../controllers/api/user');
const {login} = require('../../controllers/api/user');


const router = Router();

router.post('/register', [
    check('username', 'Username is required!').notEmpty(),
    check('email', 'Username is required!').notEmpty(),
    check('email', 'Please enter valid email').notEmpty(),
    check('password', 'Password is required!').notEmpty(),
    check('confirmPassword', 'Please confirm your password!').notEmpty()
], register);

router.post('/login', [
    check('email', 'Username is required!').notEmpty(),
    check('email', 'Please enter valid email').notEmpty(),
    check('password', 'Password is required!').notEmpty()
], login);

router.get('/user-info', getInfo)

module.exports = router;