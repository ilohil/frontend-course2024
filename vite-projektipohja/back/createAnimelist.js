const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('animelist.db');

db.serialize(() => {

	let sql = `
        CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS streaming_services (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
        );
    
        CREATE TABLE IF NOT EXISTS animes (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        category INTEGER NOT NULL,
        picture TEXT,
        credits TEXT,
        description TEXT NOT NULL,
        seasons TEXT NOT NULL,
        wheretowatch INTEGER NOT NULL,
        grade REAL NOT NULL,
        votecount INTEGER,
        FOREIGN KEY(category) REFERENCES categories(id),
        FOREIGN KEY(wheretowatch) REFERENCES streaming_services(id)
        );
    `

	db.exec(sql, (error) => {
		if (error) {
			return console.log(error.message);
		}
		console.log("Tables created succesfully.");
	});

    const categories = [
        {name: 'adventure'},
        {name: 'drama'},
        {name: 'history'},
        {name: 'romance'},
        {name: 'action'},
        {name: 'mystery'}
    ];

    let categoryid = 1

    categories.forEach(category => {

    const sql = "INSERT INTO categories (id, name) VALUES (?, ?)";
    const values = [categoryid, category.name];

    db.run(sql, values, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("New category added");
	});

    categoryid++;

    }
    )

    const streamingServices = [
        'Crunchyroll',
        'Netflix',
        'Hulu',
        'Amazon prime'
    ]

    let streamingid = 1

    streamingServices.forEach(service => {

    const sql = "INSERT INTO streaming_services (id, name) VALUES (?, ?)";
    const values = [streamingid, service];

    db.run(sql, values, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("New streaming service added");
	});

    streamingid++;

    });

    const animes = [
        {
          id: 1,
          name: 'Demon Slayer: Kimetsu no Yaiba',
          category: 1,
          picture: 'kimetsu_no_yaiba_wallpaper_by_dinocozero_ddw65zk.jpg', 
          credits: {artist: 'Dinocozero', homepage: 'https://www.deviantart.com/dinocozero', license: 'CC BY-NC-ND 3.0 DEED', info: 'https://creativecommons.org/licenses/by-nc-nd/3.0/'},
          description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.',
          seasons: {season1: '6.4.2019', season2: '10.10.2023', season3: '9.4.2023', season4:'12.5.2024'},
          wheretowatch: 1,
          grade: 4,
          votecount: 1
        },
        {
          id: 2,
          name: 'The Apothecary Diaries',
          category: 2,
          picture: 'husbando_material_by_phoenixgenshinimpact_dh6e2ok.png',
          credits: {artist: 'PhoenixGenshinImpact', homepage: 'https://www.deviantart.com/phoenixgenshinimpact', license: 'CC BY-NC-ND 3.0 DEED', info: 'https://creativecommons.org/licenses/by-nc-nd/3.0/'},
          description: 'A young maiden is kidnapped and sold into servitude at the emperor’s palace, where she secretly employs her pharmacist skills with the help of the head eunuch to unravel medical mysteries in the inner court.',
          seasons: {season1: '22.10.2023', season2: '0.0.2025'},
          wheretowatch: 1,
          grade: 5,
          votecount: 1
        },
        {
          id: 3,
          name: 'Vinland Saga',
          category: 3,
          picture: 'thorfinn_wallpaper_by_dinocozero_ddu4d3c.jpg', 
          credits: {artist: 'Dinocozero', homepage: 'https://www.deviantart.com/dinocozero', license: 'CC BY-NC-ND 3.0 DEED', info: 'https://creativecommons.org/licenses/by-nc-nd/3.0/'},
          description: 'Following a tragedy, Thorfinn embarks on a journey with the man responsible for it to take his life in a duel as a true and honorable warrior to pay homage.',
          seasons: {season1: '7.7.2019', season2: '10.1.2023'},
          wheretowatch: 2,
          grade: 3,
          votecount: 1
        }
      ]

      animes.forEach(anime => {

        const sql = "INSERT INTO animes (id, name, category, picture, credits, description, seasons, wheretowatch, grade, votecount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [anime.id, anime.name, anime.category, anime.picture, JSON.stringify(anime.credits), anime.description, JSON.stringify(anime.seasons), anime.wheretowatch, anime.grade, anime.votecount];
    
        db.run(sql, values, (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log("New anime added");
        });
    
        });

});
