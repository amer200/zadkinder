const jwt = require("jsonwebtoken");

exports.isStudent = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({
            msg: "token is required"
        })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(400).json({
                msg: err
            })
        }
        if (user.user.role == 'student') {
            req.user = user.user
            next();
        } else {
            console.log(user.user.role)
            res.status(304).json({
                msg: "not allowed"
            })
        }
    })
}