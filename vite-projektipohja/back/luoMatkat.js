const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('matkat.db');

db.serialize(() => {

	let sql = "CREATE TABLE matka (" +
		"id integer PRIMARY KEY NOT NULL, " +
		"otsikko text NOT NULL, " +
		"paiva date NOT NULL, " +
		"paikka text NOT NULL, " +
		"saa text NOT NULL, " +
		"kuva text, " +
		"kuvaus text )";

	db.run(sql, (error) => {
		if (error) {
			return console.log(error.message);
		}
		console.log("Taulu tehtiin");
	});

	sql = "INSERT INTO `matka` (`id`, `otsikko`, `paiva`, `paikka`, `saa`, `kuva`, `kuvaus`) " +
		" VALUES (1, 'Lomalla', '2024-05-26', 'Lohja', 'Aurinkoista, 10', 'tammi.PNG', 'Lomalla Lohjalla')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `matka` (`id`, `otsikko`, `paiva`, `paikka`, `saa`, `kuva`, `kuvaus`) " +
		" VALUES (2, 'Mökillä', '2024-06-08', 'Savonlinna', 'Aurinkoinen, 21', 'lumpeet.PNG', 'Mökillä Itä-Suomessa')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	sql = "INSERT INTO `matka` (`id`, `otsikko`, `paiva`, `paikka`, `saa`, `kuva`, `kuvaus`) " +
		" VALUES (3, 'Sukuloimassa', '2024-05-20', 'Vantaa', 'Pilvinen, 9', 'kakku.jpg', 'Kahvihetki')";
	db.run(sql, (err) => {
		if (err) {
			return console.log(err.message);
		}
		console.log("Rivi lisättiin");
	});

	db.each("SELECT id, otsikko FROM matka", function (err, row) {
		if (err) {
			return console.log(err.message);
		}
		console.log(row.id + ", " + row.otsikko);
	});

	db.close();
});
