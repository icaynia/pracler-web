const router = require('express').Router()
const controller = require('./user.controller')

router.get('/:username', controller.index);
router.get('/:username/nowplaying', controller.nowplaying);
module.exports = router;