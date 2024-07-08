const router = require('express').Router();
const chatController = require('../../controllers/chatController');
const requireUser = require('../../middleware/requireUser');

router.use(requireUser);

router.get('/', chatController.getChats);

router.get('/:frontId', chatController.getChatById);

router.delete('/:frontId', chatController.deleteChat);

module.exports = router;
