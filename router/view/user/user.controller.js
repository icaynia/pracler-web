
exports.index = (req, res) => {
    var username = req.params.username;
    const create = (user) => {
        if (user)
        {
            throw new Error('email already exists');
        }
        else
        {
            return User.create(email, nickname, password, birthday, gender);
        }
    }

    const count = (user) => {
        newUser = user;
        return User.count({}).exec();
    }

    const assign = (count) => {
        if (count === 1)
        {
            return newUser.assignAdmin();
        }
        else
        {
            return Promise.resolve();
        }
    }

    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    console.log('user');
    res.status(409).send(username);

    // User.findUserByEmail(email)
    // .then(create)
    // .then(count)
    // .then(assign)
    // .then(respond)
    // .catch(onError)
}