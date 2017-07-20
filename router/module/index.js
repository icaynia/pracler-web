const router = require('express').Router();

router.use('/', require('./home'));
router.use('/api', require('./api'));
router.use('/', require('./user'));

module.exports = router;