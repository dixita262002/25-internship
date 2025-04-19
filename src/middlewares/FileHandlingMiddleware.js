const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/project/addwithfile', upload.single('image'), (req, res) => {
    console.log('File received:', req.file);
    res.status(200).send({ message: 'File uploaded successfully' });
});
