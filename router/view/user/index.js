const router = require('express').Router()
const controller = require('./user.controller')

router.get('/:username', controller.index);
module.exports = router;