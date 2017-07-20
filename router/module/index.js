const router = require('express').Router();


router.use('/', require('./home'));
router.use('/', require('./user'));

module.exports = router;