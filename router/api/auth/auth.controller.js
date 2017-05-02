var request = require('request');

exports.register = (req, res) => {
    const { email, password, nickname, birthday, gender } = req.body;
    let newUser = null;

    request({ 
            url: "http://localhost:3000/api/auth/register", 
            method: 'POST', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //있는 경우
                res.send({result:1});
            }
            else
            {
                //없는 경우
                res.send({result:0});
            }
    });
}


exports.login = (req, res) => {
    const { email, password } = req.body;
    let newUser = null;

    res.send('login is working');
}