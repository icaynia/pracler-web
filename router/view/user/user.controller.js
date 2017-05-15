var request = require('request');

const Fetch = require('../../util/fetch');
exports.index = (req, res) => {
    var username = req.params.username;
    
    request("http://localhost:3000/api/user/"+username , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //있는 경우
            res.render('./pages/user/main', {
                param: req.params,
                data: JSON.parse(Fetch.unfetch(body)),
                search: ""
            });
        }
        else
        {
            res.render('./pages/404');
        }
    });
}