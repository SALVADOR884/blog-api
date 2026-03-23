const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', articleRoutes);

app.get('/', (req, res) => {
  res.send('API Blog - Utilise /api/articles');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});