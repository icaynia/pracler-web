const router = require('express').Router()
const controller = require('./user.controller');

router.get('/:username', controller.index);
router.get('/:username/sub/nowplaying', controller.nowplaying);
router.get('/:username/sub/history', controller.history);

router.get('/:username/sub/album_popular', controller.album_popular);
router.get('/:username/sub/history_popular', controller.history_popular);

module.exports = router;