const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Student = require('../models/student');

/** Students registration */
exports.regNewStudent = async (req, res) => {
    const { name, gender, nationality, cid, kinder, time, fathername, fatherno, motherno, address, bus } = req.body

    const student = await Student.findOne({ cid })
    if (student) {
        res.status(401).json({ msg: `Student with this cid ${cid} is already registered` })
    }

    const newStudent = new Student({
        name: name,
        gender: gender,
        nationality: nationality,
        cid: cid,
        kinder: kinder,
        time: time,
        fathername: fathername,
        fatherno: fatherno,
        motherno: motherno,
        address: address,
        bus: bus
    })
    newStudent.save()
        .then(s => {
            res.status(200).json({
                msg: "ok",
                data: newStudent
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: err
            })
        })
}
exports.loginStudent = async (req, res) => {
    const { cid, password } = req.body

    try {
        const student = await Student.findOne({ cid })
        if (!student) {
            res.status(404).json({ msg: `Wrong cid or password` })
        }

        if (!student.activated) {
            res.status(400).json({ msg: `Sorry, this account is not activated yet.` })
        }

        const isMatch = await bcrypt.compare(password, student.password)
        if (!isMatch) {
            res.status(404).json({ msg: `Wrong cid or password` })
        }

        const user = {
            id: student._id,
            name: "student",
            role: "student"
        }
        const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN)
        res.status(200).json({
            msg: 'ok',
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(`Server error`)
    }
}

/** With Student Auth */
exports.getStudentProfile = async (req, res) => {
    const { id } = req.user

    try {
        const student = await Student.findById(id)
        if (!student) {
            res.status(400).json(`No student for this id ${id}`)
        }

        res.status(200).json({ data: student })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }

}

/** With Admin Auth */
exports.setStudentPassword = async (req, res) => {
    const { id } = req.params
    const { password } = req.body;

    try {
        const student = await Student.findById(id)
        if (!student) {
            res.status(400).json({ msg: `No student for this id ${id}` })
        }

        student.password = await bcrypt.hash(password, 8)
        student.activated = true

        await student.save()
        res.status(200).json({ msg: "ok" })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server error"
        })
    }
}


exports.getStudents = async (req, res) => {
    try {
        const page = +req.query.page || 1
        const limit = +req.query.limit || 20 // max number of items (students) per page
        const skip = (page - 1) * limit

        const studentsPerPage = await Student.find().limit(limit).skip(skip)

        const studentsNo = await Student.countDocuments()
        const numberOfPages = (studentsNo % limit == 0) ? studentsNo / limit : Math.floor(studentsNo / limit) + 1;

        res.status(200).json({
            results: studentsPerPage.length,
            pagination: {
                currentPage: page,
                limit,
                numberOfPages
            },
            data: studentsPerPage
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: err.message
        })
    }

}
exports.getStudentById = async (req, res) => {
    const { id } = req.params

    try {
        const student = await Student.findById(id)
        if (!student) {
            res.status(400).json(`No student for this id ${id}`)
        }

        res.status(200).json({ data: student })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }

}
exports.removeStudent = (req, res) => {
    const id = req.params.id;
    Student.findByIdAndRemove(id)
        .then(s => {
            res.status(200).json({
                msg: "ok",
                student: s
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
}
exports.editStudent = (req, res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const nationality = req.body.nationality;
    const cid = req.body.cid;
    const kinder = req.body.kinder;
    const time = req.body.time;
    const fathername = req.body.fathername;
    const fatherno = req.body.fatherno;
    const motherno = req.body.motherno;
    const address = req.body.address;
    const bus = req.body.bus;
    const id = req.params.id;
    Student.findById(id)
        .then(s => {
            if (s) {
                s.name = name;
                s.gender = gender;
                s.nationality = nationality;
                s.cid = cid;
                s.kinder = kinder;
                s.time = time;
                s.fathername = fathername;
                s.fatherno = fatherno;
                s.motherno = motherno;
                s.address = address;
                s.bus = bus;
                s.save()
                    .then(s => {
                        res.status(200).json({
                            student: s
                        })
                    })
            } else {
                res.status(404).json({
                    msg: "student not found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: err.message
            })
        })
}