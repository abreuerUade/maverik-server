const router = require('express').Router();
const userAuthController = require('../../controllers/userAuthController');

router.post('/auth', userAuthController.login);

router.delete('/auth', userAuthController.logout);

module.exports = router;
