const Article = require('../models/article');

exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;
  const date = new Date().toISOString().split('T')[0];

  if (!titre || !contenu || !auteur) {
    return res.status(400).json({ error: 'titre, contenu et auteur sont requis' });
  }

  Article.create({ titre, contenu, auteur, date, categorie, tags }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.id, message: 'Article créé' });
  });
};

exports.getArticles = (req, res) => {
  const { categorie, auteur, date } = req.query;
  Article.findAll({ categorie, auteur, date }, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getArticleById = (req, res) => {
  const id = req.params.id;
  Article.findById(id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Article non trouvé' });
    res.json(row);
  });
};

exports.updateArticle = (req, res) => {
  const id = req.params.id;
  const { titre, contenu, categorie, tags } = req.body;
  Article.update(id, { titre, contenu, categorie, tags }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) return res.status(404).json({ error: 'Article non trouvé' });
    res.json({ message: 'Article mis à jour' });
  });
};

exports.deleteArticle = (req, res) => {
  const id = req.params.id;
  Article.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.changes === 0) return res.status(404).json({ error: 'Article non trouvé' });
    res.json({ message: 'Article supprimé' });
  });
};

exports.searchArticles = (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Le paramètre query est requis' });
  Article.search(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};