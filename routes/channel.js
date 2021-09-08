const express = require('express');
const router = express.Router();

const validateBody = require('./middleware/validateBody');
const channelController = require('./controllers/channel.controller');

router.get('/', channelController.getChannels);
router.get('/:channelId', channelController.getChannel);
router.get('/:channelId/users/:userId', channelController.getUserType);

router.post('/', validateBody, channelController.createChannel);

module.exports = router;
