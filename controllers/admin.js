const jwt = require("jsonwebtoken");

exports.logIn = (req, res) => {
    const password = req.body.password;
    if (password == process.env.ADMIN_PASS) {
        req.session.admin = true;
        const user = {
            id: "123",
            name: "admin",
            roll: "admin"
        }
        const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN);
        res.status(200).json({
            msg: "ok",
            token: token
        })
    } else {
        res.status(304).json({
            msg: "wrong pass"
        })
    }
}
exports.logOut = async (req, res) => {
    await req.session.destroy()
    res.status(200).json({
        msg: "ok"
    })
}