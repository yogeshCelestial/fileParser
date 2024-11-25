import express from 'express';
import configDotenv from 'dotenv';
import bodyParser from "body-parser"
const app = express();
configDotenv.config();
import multer from "multer";
import cors from 'cors';
import csv from 'csv-parser';
import fs from 'fs';


const upload = multer({
    dest: 'uploads/', // Directory where files will be temporarily saved
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

const csvParser = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send({ error: 'No file uploaded' });
        } else {
            const results = [];

            fs.createReadStream(file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    res.status(200).send(results);
                });
        }

    } catch (e) {
        res.status(500).send({ error: 'Internal Server Error' });
    }

};

const jsonParser = (req, res) => {
    try {
        // Access the uploaded file from req.file
        const file = req.file;
        if (!file) {
            return res.status(400).send({ error: 'No file uploaded' });
        } else {

            const fileContent = fs.readFileSync(file.path, 'utf8');
            const result = JSON.parse(fileContent);
            res.status(200).send(result);
        }
    } catch (err) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.post('/api/parser/csv', upload.single('csvFile'), csvParser);
app.post('/api/parser/json', upload.single('jsonFile'), jsonParser);


const port = 9000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

