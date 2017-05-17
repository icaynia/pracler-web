const router = require('express').Router();
const auth = require('./auth');
const history = require('./history');

var ursa = require('ursa');
var fs = require('fs');

var crt = ursa.createPublicKey(fs.readFileSync('utils/server.pub'));

// 값 암호화 요청
router.post('/rsa/encrypt', function(req, res) {
    res.json({
        pw: crt.encrypt(req.body.inputPassword, 'utf8', 'base64')
    });
});


router.use('/auth', auth);
router.use('/history', history);


module.exports = router;