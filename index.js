import express from 'express';
import configDotenv from 'dotenv';
import bodyParser from "body-parser"
const app = express();
configDotenv.config();
import multer from "multer";
import cors from 'cors';


const upload = multer({
    dest: 'uploads/', // Directory where files will be temporarily saved
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

import fs from 'fs';
const csvParser = (req, res) => {
};

const jsonParser = (req, res) => {
        try {
            // Access the uploaded file from req.file
            const file = req.file;
            if (!file) {
                return res.status(400).send({error: 'No file uploaded'});
            } else {

                const fileContent = fs.readFileSync(file.path, 'utf8');
                const result = JSON.parse(fileContent);
                console.log('Parsed JSON:', result);
                res.status(200).send(result);
            }
        } catch (err) {
            console.log(err);
        }
}

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.post('/api/parser/csv', csvParser);
app.post('/api/parser/json', upload.single('jsonFile'), jsonParser);


const port = 9000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

