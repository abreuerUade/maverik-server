const router = require('express').Router();
const messageController = require('../../controllers/messageController');
const requireUser = require('../../middleware/requireUser');

router.use(requireUser);

router.post('/', messageController.sendMessage);

module.exports = router;
