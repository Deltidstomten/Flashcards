const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const sql = require("./sql")
const app = express()
const port = 3000

const db = new sqlite3.Database('database.db')
db.run("PRAGMA foreign_keys = ON;")

app.use(express.static('public'))
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug')

/*
db.serialize(() => {
    db.all(sql.insertCardSQL(), [1, "Apelsin", "Orange"], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        if (row == undefined) {
            return
        }
        console.log(row)
    });
});
*/

function getCollections() {
    return new Promise((resolve, reject) => {          // return new Promise here <---
      return db.all(sql.getAllCollectionsSQL(), function (err, row) { // .run <----
        if (err) {
          console.error("DB Error: Insert failed: ", err.message);
          return reject(err.message);
        }
        return resolve(row);
      });
    });
}

function getCards(id) {
    return new Promise((resolve, reject) => {          // return new Promise here <---
      return db.all(sql.getCardsByCollectionSQL(), [id], function (err, row) { // .run <----
        if (err) {
          console.error("DB Error: Insert failed: ", err.message);
          return reject(err.message);
        }
        return resolve(row);
      });
    });
}

function getCollection(id) {
  return new Promise((resolve, reject) => {          // return new Promise here <---
    return db.all(sql.getCollectionById(), [id], function (err, row) { // .run <----
      if (err) {
        console.error("DB Error: Insert failed: ", err.message);
        return reject(err.message);
      }
      return resolve(row);
    });
  });
}

function insertCollection(name, author) {
  return new Promise((resolve, reject) => {          // return new Promise here <---
    return db.run(sql.insertCollectionSQL(), [name, author], function (err) { // .run <----
      if (err) {
        console.error("DB Error: Insert failed: ", err.message);
        return reject(err.message);
      }
      return resolve(this.lastID); // retunerar id som collection fick
    });
  });
}

function insertCard(collection, front, back) {
  return new Promise((resolve, reject) => {          // return new Promise here <---
    return db.run(sql.insertCardSQL(), [collection, front, back], function (err) { // .run <----
      if (err) {
        console.error("DB Error: Insert failed: ", err.message);
        return reject(err.message);
      }
      return resolve(this.lastID); // retunerar id som collection fick
    });
  });
}

app.get('/', async (req, res) => {
    let collections = await getCollections()
    console.log(collections)
    res.render('index', {"collections" : collections})
})

app.get('/collection/:id', async (req, res) => {
    let cards = await getCards(req.params.id)
    let collection = await getCollection(req.params.id)
    console.log(cards)
    console.log(collection)
    res.render('collection', {"cards" : cards, "collection" : collection[0]})
})

app.get('/create', async (req, res) => {
  res.render('create', {})
})

app.post('/create', async (req, res) => {
  console.log(req.body)
  let id = await insertCollection(req.body.name, req.body.author)
  for (const property in req.body.cards) {
    insertCard(id, property, req.body.cards[property])
  }
  res.sendStatus(200)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

/*

collection
    id INTEGER PRIMARY KEY
    name TEXT


card
    id INTEGER PRIMARY KEY
    collection_id INT FOREIGN KEY collection.id
    front TEXT
    back TEXT
*/