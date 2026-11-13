const analistaRepository = require('../repository/analistaRepository');

async function getAll(req, res) {
  try {
    const analistas = await analistaRepository.findAll();
    res.json(analistas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar analistas', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const analista = await analistaRepository.findById(req.params.id);
    if (!analista) {
      return res.status(404).json({ message: 'Analista não encontrado' });
    }
    return res.json(analista);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar analista', error: error.message });
  }
}

async function create(req, res) {
  try {
    const analista = await analistaRepository.create(req.body);
    res.status(201).json(analista);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar analista', error: error.message });
  }
}

async function update(req, res) {
  try {
    const analista = await analistaRepository.update(req.params.id, req.body);
    if (!analista) {
      return res.status(404).json({ message: 'Analista não encontrado' });
    }
    return res.json(analista);
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao atualizar analista', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await analistaRepository.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Analista não encontrado' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover analista', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
