const express = require('express');
const app = express();

let helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }))

app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

app.use(express.json());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('matkat.db', (error) => {
    if (error) {
        console.log(error.message);
        return ({ message: 'Kantaa ei voida avata ' + error.message });
    }
});

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Toimii' });
});

app.get('/matka/all', (req, res) => {
    db.all('select * from matka', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/matka/one/:id', (req, res) => {
    let id = req.params.id;

    db.get('select * from matka where id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        // Jos haku ei tuottanut yhtään riviä
        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'Haettua matkaa ei ole' });
        }

        return res.status(200).json(result);
    });
});

app.get('/matka/kuvat', (req, res) => {
    db.all('select kuva  from matka where kuva IS NOT NULL', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.delete('/matka/delete/:id', (req, res) => {
    let id = req.params.id;

    // Huomaa, että ei nuolinotaatiofunktioina kuten muissa kohdassa
    db.run('delete from matka where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Ei poistettavaa');
            return res.status(404).json({ message: 'Ei poistettavaa matkaa' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images'); // Mihin kansioon ladataan
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);  // Millä tiedostonimellä
    }
});

const upload = multer({ storage: storage })

app.post('/matka/add', upload.single('kuva'), (req, res) => {
    let matka = req.body;

    let kuvaNimi = null;
    if (req.file) {
        kuvaNimi = req.file.originalname;
    }

    db.run('insert into matka (otsikko,paiva,paikka,saa,kuva,kuvaus) values (?, ?, ?, ?, ?, ?)',
        [matka.otsikko, matka.paiva, matka.paikka, matka.saa, kuvaNimi, matka.kuvaus], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

app.get('/download/:nimi', (req, res) => {
    let file = './images/' + req.params.nimi;
    res.download(file);
});

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Ei pyydettyä palvelua' });
});
