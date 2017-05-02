exports.register = (req, res) => {
    const { email, password, nickname, birthday, gender } = req.body;
    let newUser = null;

    res.send('register is working');
}