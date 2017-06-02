const router = require('express').Router()
const controller = require('./user.controller')

router.get('/:username', controller.index);
router.get('/:username/nowplaying', controller.nowplaying);

router.get('/:username/album_popular', controller.album_popular);
router.get('/:username/history_popular', controller.history_popular);

module.exports = router;