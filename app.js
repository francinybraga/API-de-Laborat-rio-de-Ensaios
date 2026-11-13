const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const analistaRoutes = require('./routes/analistaRoutes');
const ensaioRoutes = require('./routes/ensaioRoutes');
const equipamentoRoutes = require('./routes/equipamentoRoutes');

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-laboratorio-ensaios' });
});

app.use('/api/analistas', analistaRoutes);
app.use('/api/ensaios', ensaioRoutes);
app.use('/api/equipamentos', equipamentoRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
  });
}

module.exports = app;
