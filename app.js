require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
const jwt = require("jsonwebtoken");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var cors = require('cors');
app.use(cors())
/********************************************************************************* */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());

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
const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'mySessions'
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store
}))
/******************************************************************************** */
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
app.use('/admin', adminRoutes);
app.use('/students', studentRoutes);
/********************************************************************************* */
mongoose.connect(dbUrl)
    .then(res => {
        console.log('db connection done !');
        app.listen(port, () => {
            console.log(`Server runs on: http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })