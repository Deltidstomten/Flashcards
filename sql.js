let createCollectionSQL = `CREATE TABLE collection (
    id INTEGER PRIMARY KEY,
	name TEXT,
    author TEXT
);`

let createCardSQL = `CREATE TABLE card (
    id INTEGER PRIMARY KEY,
    collection_id INTEGER,
	front TEXT,
    back TEXT,
    FOREIGN KEY(collection_id) REFERENCES collection(id)
);`

let insertCollectionSQL = `INSERT INTO collection(name, author) VALUES (?, ?)`

let insertCardSQL = `INSERT INTO card(collection_id, front, back) VALUES (?, ?, ?)`

let getAllCollectionsSQL = `SELECT * FROM collection`

let getCardsByCollectionSQL = `SELECT * FROM card WHERE collection_id = ?`


module.exports.createCollectionSQL = function() {
    return createCollectionSQL;
}

module.exports.createCardSQL = function() {
    return createCardSQL;
}

module.exports.insertCollectionSQL = function() {
    return insertCollectionSQL;
}

module.exports.insertCardSQL = function() {
    return insertCardSQL;
}

module.exports.getAllCollectionsSQL = function() {
    return getAllCollectionsSQL;
}

module.exports.getCardsByCollectionSQL = function() {
    return getCardsByCollectionSQL;
}


