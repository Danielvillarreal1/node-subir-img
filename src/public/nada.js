const express =  require('express');
const ejs = require('ejs'); // tiene un integracion por defecto con expres.se puede requerir no, funciona igua pero tengo que configurar
const path = require('path');
const multer = require('multer'); //tengo en toda la app, puedo llevar a las rutas y tengo en un solo archivo

//Initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
const storage = multer.diskStorage({
    destination:  path.join(__dirname, './public/uploads') ,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
}); 

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 2000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo debe ser una imagen ");
    }
}).single('image'));


//Routes
app.use(express.static(path.join(__dirname, 'public')));

//Static files
app.use(require('.public/uploads'))

//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});






//middlewares
const storage = multer.diskStorage({
    destination:  path.join(__dirname, './public/uploads') ,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}); 

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 1000000}
}).single('image'));