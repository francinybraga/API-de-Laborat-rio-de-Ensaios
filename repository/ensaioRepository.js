const conexao = require('../database/conexao');

async function listarEnsaios() {
  const [linhas] = await conexao.execute('SELECT * FROM ensaio ORDER BY id_ensaio');
  return linhas;
}

async function buscarEnsaioPorId(id) {
  const [linhas] = await conexao.execute(
    'SELECT * FROM ensaio WHERE id_ensaio = ?',
    [id]
  );
  return linhas[0] || null;
}

async function criarEnsaio(ensaio) {
  const [resultado] = await conexao.execute(
    'INSERT INTO ensaio (nome, norma, status) VALUES (?, ?, ?)',
    [ensaio.nome, ensaio.norma, ensaio.status]
  );
  return buscarEnsaioPorId(resultado.insertId);
}

async function atualizarEnsaio(id, campos) {
  const colunasPermitidas = ['nome', 'norma', 'status'];
  const colunas = Object.keys(campos).filter((coluna) => colunasPermitidas.includes(coluna));
  const valores = colunas.map((coluna) => campos[coluna]);
  const atribuicoes = colunas.map((coluna) => `${coluna} = ?`).join(', ');

  await conexao.execute(
    `UPDATE ensaio SET ${atribuicoes} WHERE id_ensaio = ?`,
    [...valores, id]
  );
  return buscarEnsaioPorId(id);
}

async function excluirEnsaio(id) {
  await conexao.execute('DELETE FROM ensaio WHERE id_ensaio = ?', [id]);
}

module.exports = {
  listarEnsaios,
  buscarEnsaioPorId,
  criarEnsaio,
  atualizarEnsaio,
  excluirEnsaio,
};
