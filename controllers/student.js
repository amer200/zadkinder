const Student = require('../models/student');
exports.regNewStudent = (req, res) => {

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
                msg: "student saved"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                msg: err
            })
        })
}
exports.getStudents = async (req, res) => {
    try {
        let x = req.params.studentsNumber;
        if (x = 0) {
            x = 10;
        }
        const students = await Student.find().limit(x)
        res.status(200).json({
            data: students
        })
    } catch {
        console.log(err)
        res.status(500).json({
            msg: err
        })
    }

}