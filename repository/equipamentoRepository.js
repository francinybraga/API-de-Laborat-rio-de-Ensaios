const conexao = require('../database/conexao');

async function listarEquipamentos() {
  const [linhas] = await conexao.execute('SELECT * FROM equipamento ORDER BY id_equipamento');
  return linhas;
}

async function buscarEquipamentoPorId(id) {
  const [linhas] = await conexao.execute(
    'SELECT * FROM equipamento WHERE id_equipamento = ?',
    [id]
  );
  return linhas[0] || null;
}

async function criarEquipamento(equipamento) {
  const [resultado] = await conexao.execute(
    'INSERT INTO equipamento (nome, patrimonio, situacao) VALUES (?, ?, ?)',
    [equipamento.nome, equipamento.patrimonio, equipamento.situacao]
  );
  return buscarEquipamentoPorId(resultado.insertId);
}

async function atualizarEquipamento(id, campos) {
  const colunasPermitidas = ['nome', 'patrimonio', 'situacao'];
  const colunas = Object.keys(campos).filter((coluna) => colunasPermitidas.includes(coluna));
  const valores = colunas.map((coluna) => campos[coluna]);
  const atribuicoes = colunas.map((coluna) => `${coluna} = ?`).join(', ');

  await conexao.execute(
    `UPDATE equipamento SET ${atribuicoes} WHERE id_equipamento = ?`,
    [...valores, id]
  );
  return buscarEquipamentoPorId(id);
}

async function excluirEquipamento(id) {
  await conexao.execute('DELETE FROM equipamento WHERE id_equipamento = ?', [id]);
}

module.exports = {
  listarEquipamentos,
  buscarEquipamentoPorId,
  criarEquipamento,
  atualizarEquipamento,
  excluirEquipamento,
};
