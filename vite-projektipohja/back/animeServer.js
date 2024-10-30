const express = require('express');
const app = express();
let helmet = require('helmet');
app.use(express.urlencoded({ limit: '5mb', extended: true }));
const cors = require('cors');
app.use(cors());
app.use(express.json());
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('animelist.db', (error) => {
    if (error) {
        console.log(error.message);
        return ({ message: 'Unable to open database ' + error.message });
    }
});

app.listen(8080, () => {
    console.log('Node is listening to localhost:8080');
});

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'It works!' });
});

app.get('/categories/all', (req, res) => {
    db.all('SELECT * FROM categories', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/streamingservices/all', (req, res) => {
    db.all('SELECT * FROM streaming_services', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/animes/all', (req, res) => {
    db.all('SELECT * FROM animes', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.get('/categories/:id', (req, res) => {
    let id = req.params.id;

    db.get('SELECT * FROM categories WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(result);
    });
});

app.get('/streamingservices/:id', (req, res) => {
    let id = req.params.id;

    db.get('SELECT * FROM streaming_services WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'Streaming service not found' });
        }

        return res.status(200).json(result);
    });
});

app.get('/animes/:id', (req, res) => {
    let id = req.params.id;

    db.get('SELECT * FROM animes WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (typeof (result) == 'undefined') {
            return res.status(404).json({ message: 'Anime not found' });
        }

        return res.status(200).json(result);
    });
});

app.get('/pictures', (req, res) => {
    db.all('SELECT json_extract(picture, "$.picture") AS picture FROM animes WHERE picture IS NOT NULL', (error, result) => {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        return res.status(200).json(result);
    });
});

app.delete('/categories/delete/:id', (req, res) => {
    let id = req.params.id;

    db.run('DELETE FROM categories where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No category to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

app.delete('/streamingservices/delete/:id', (req, res) => {
    let id = req.params.id;

    db.run('DELETE FROM streaming_services where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No streaming service to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

app.delete('/animes/delete/:id', (req, res) => {
    let id = req.params.id;

    db.run('DELETE FROM animes where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No anime to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

app.delete('/users/delete/:id', (req, res) => {
    let id = req.params.id;

    db.run('DELETE FROM users where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No user to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

app.delete('/statistics/delete/:id', (req, res) => {
    let id = req.params.id;

    db.run('DELETE FROM statistics where id = ?', [id], function (error) {
        if (error) {
            console.log(error.message);
            return res.status(400).json({ message: error.message });
        }

        if (this.changes === 0) {
            console.log('Nothing to delete');
            return res.status(404).json({ message: 'No statistic to delete' });
        }

        return res.status(200).json({ count: this.changes });
    });
});

app.post('/categories/add', (req, res) => {

    let category = req.body;

    db.run('INSERT INTO categories (name) values (?)',
        [category.name], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

app.post('/streamingservices/add', (req, res) => {
    
    let service = req.body;

    db.run('INSERT INTO streaming_services (name) values (?)',
        [service.name], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images'); 
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

app.post('/animes/add', upload.single('picture'), (req, res) => {
    
    let anime = req.body;

    let picName = null;
    if (req.file) {
        picName = req.file.originalname;
    }

    db.run('INSERT INTO animes (name, category, picture, credits, description, seasons, wheretowatch, grade, votecount) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [anime.name, anime.category, picName, anime.credits, anime.description, anime.seasons, anime.wheretowatch, anime.grade, anime.votecount], (error) => {

            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }

            return res.status(200).json({ count: 1 });
        });
});

app.get('/download/:name', (req, res) => {
    let picName = req.params.name;
    let file = './images/' + picName;
    res.download(file);
});

app.put('/categories/edit/:id', (req, res) => {
    let id = req.params.id;
    let category = req.body;

    db.run('UPDATE categories SET name = ? WHERE id = ?',
        [category.name, id], (error) => {
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            return res.status(200).json({ message: 'Category updated successfully' });
        });
});

app.put('/streamingservices/edit/:id', (req, res) => {
    let id = req.params.id;
    let service = req.body;

    db.run('UPDATE streaming_services SET name = ? WHERE id = ?',
        [service.name, id], (error) => {
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            return res.status(200).json({ message: 'Streaming service updated successfully' });
        });
});

app.put('/animes/edit/:id', (req, res) => {
    let id = req.params.id;
    let anime = req.body;

    db.run('UPDATE animes SET name = ?, category = ?, description = ?, seasons = ?, wheretowatch = ?, grade = ?, votecount = ? WHERE id = ?',
        [anime.name, anime.category, anime.description, anime.seasons, anime.wheretowatch, anime.grade, anime.votecount, id], (error) => {
            if (error) {
                console.log(error.message);
                return res.status(400).json({ message: error.message });
            }
            return res.status(200).json({ message: 'Anime updated successfully' });
        });
});

app.get('*', (req, res) => {
    return res.status(404).json({ message: 'Service not found' });
});