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
    request({ 
            url: "http://localhost:3000/api/auth/login", 
            method: 'POST', 
            form: req.body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //성공
                res.cookie('frv', JSON.parse(body).token, {
                       httpOnly: true, maxAge: 60 * 60 * 1000 * 24 * 30 // 1 month
                });
                res.send({result:1});
                console.log("성공 : " + req.body.email);

            }
            else
            {
                //실패
                res.send({result:0});
                console.log("\x1b[31m", "실패 : " + req.body.email);
            }
    });
}

exports.logout = (req, res) => {
    res.cookie('frv', "", {});
    res.send("<script> window.location.href = '/';</script>");
}
