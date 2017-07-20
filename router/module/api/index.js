const router = require('express').Router();
const auth = require('./auth');
const history = require('./history');
const music = require('./music');
const song = require('./song');
const playlist = require('./playlist');

var ursa = require('ursa');
var fs = require('fs');

var crt = ursa.createPublicKey(fs.readFileSync('utils/server.pub'));

// 값 암호화 요청
router.post('/rsa/encrypt', function(req, res) {
    res.json({
        pw: crt.encrypt(req.body.inputPassword, 'utf8', 'base64')
    });
});

router.use('/data', require('./data'));
router.use('/auth', auth);
router.use('/history', history);
router.use('/music', music);
router.use('/song', song);
router.use('/playlist', playlist);


module.exports = router;