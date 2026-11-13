const equipamentoRepository = require('../repository/equipamentoRepository');

async function getAll(req, res) {
  try {
    const equipamentos = await equipamentoRepository.findAll();
    res.json(equipamentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar equipamentos', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const equipamento = await equipamentoRepository.findById(req.params.id);
    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    return res.json(equipamento);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar equipamento', error: error.message });
  }
}

async function create(req, res) {
  try {
    const equipamento = await equipamentoRepository.create(req.body);
    res.status(201).json(equipamento);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar equipamento', error: error.message });
  }
}

async function update(req, res) {
  try {
    const equipamento = await equipamentoRepository.update(req.params.id, req.body);
    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    return res.json(equipamento);
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao atualizar equipamento', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const deleted = await equipamentoRepository.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover equipamento', error: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };
