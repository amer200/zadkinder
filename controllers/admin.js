const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Admin = require("../models/admin");

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    // const a = await bcrypt.hash("123", 8)
    // console.log(a)

    try {
        const admin = await Admin.findOne({ email })

        if (admin) {
            const isMatch = await bcrypt.compareSync(password, admin.password)

            if (isMatch) {
                const user = {
                    id: "123",
                    name: "admin",
                    role: "admin"
                }
                const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN);
                res.status(200).json({
                    msg: "ok",
                    token: token
                })
            } else {
                res.status(400).json({
                    msg: "wrong password or email"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            msg: "Server error"
        })
    }
}

exports.changePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;

    try {
        let admin = await Admin.findOne({ email })

        if (admin) {
            const isMatch = await bcrypt.compareSync(password, admin.password)
            if (isMatch) {
                const hashedPass = await bcrypt.hash(newPassword, 8)
                admin.password
                await admin.save()

                res.status(200).json({
                    msg: "Password is changed successfully"
                })
            } else {
                res.status(400).json({
                    msg: "wrong password or email"
                })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server error"
        })
    }
}

exports.logOut = async (req, res) => {
    await req.session.destroy()
    res.status(200).json({
        msg: "ok"
    })
}