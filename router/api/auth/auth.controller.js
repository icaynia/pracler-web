exports.register = (req, res) => {
    const { email, password, nickname, birthday, gender } = req.body;
    let newUser = null;

    res.send('register is working');
}


exports.login = (req, res) => {
    const { email, password } = req.body;
    let newUser = null;

    res.send('login is working');
}