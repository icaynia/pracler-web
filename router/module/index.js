const router = require('express').Router();

router.use('/', require('./home'));
router.use('/api', require('./api'));
router.use('/artist', require('./artist'));
router.use('/album', require('./album'));
router.use('/music', require('./music'));
router.use('/search', require('./search'));
router.use('/', require('./user'));

module.exports = router;