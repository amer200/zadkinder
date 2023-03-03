require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

/********************************************************************************* */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
/********************************************************************************* */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname;
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });
// const upload = multer({ storage: storage });
// app.post('/admin/add-slide', upload.single('img'));
// app.post('/admin/about', upload.single('img'));
// app.post('/admin/add-serv', upload.single('img'));
// app.post('/admin/add-project', upload.single('img'));
// app.post('/admin/add-parten', upload.single('img'));
// app.post('/admin/why', upload.single('img'));
// app.post('/admin/edit-serv/:id', upload.single('img'));
/********************************************************************************* */
// const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);
// app.use('/admin', adminRoutes);
/********************************************************************************* */
mongoose.connect(dbUrl)
    .then(resu => {
        console.log('db connection done !');
        app.listen(port, () => {
            console.log('app conneted on port ' + port)
        })
    })
    .catch(err => {
        console.log(err)
    })