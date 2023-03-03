const Student = require('../models/student');
exports.regNewStudent = (req, res) => {
    const name = req.body.post.name;
    const gender = req.body.post.gender;
    const nationality = req.body.post.nationality;
    const cid = req.body.post.cid;
    const kinder = req.body.post.kinder;
    const time = req.body.post.time;
    const fathername = req.body.post.fathername;
    const fatherno = req.body.post.fatherno;
    const motherno = req.body.post.motherno;
    const address = req.body.post.address;
    const bus = req.body.post.bus;

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
            console.log(s)
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
