const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'blog.db'), (err) => {
  if (err) console.error('Erreur de connexion à la base', err);
  else console.log('Connecté à SQLite');
});

db.run(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    date TEXT NOT NULL,
    categorie TEXT,
    tags TEXT
  )
`);

module.exports = db;