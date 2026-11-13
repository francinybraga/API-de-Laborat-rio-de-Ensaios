const conexao = require('../database/conexao');

async function listarAnalistas() {
  const [linhas] = await conexao.execute('SELECT * FROM analista ORDER BY id_analista');
  return linhas;
}

async function buscarAnalistaPorId(id) {
  const [linhas] = await conexao.execute(
    'SELECT * FROM analista WHERE id_analista = ?',
    [id]
  );
  return linhas[0] || null;
}

async function criarAnalista(analista) {
  const [resultado] = await conexao.execute(
    'INSERT INTO analista (nome, registro, especialidade) VALUES (?, ?, ?)',
    [analista.nome, analista.registro, analista.especialidade]
  );
  return buscarAnalistaPorId(resultado.insertId);
}

async function atualizarAnalista(id, campos) {
  const colunasPermitidas = ['nome', 'registro', 'especialidade'];
  const colunas = Object.keys(campos).filter((coluna) => colunasPermitidas.includes(coluna));
  const valores = colunas.map((coluna) => campos[coluna]);
  const atribuicoes = colunas.map((coluna) => `${coluna} = ?`).join(', ');

  await conexao.execute(
    `UPDATE analista SET ${atribuicoes} WHERE id_analista = ?`,
    [...valores, id]
  );
  return buscarAnalistaPorId(id);
}

async function excluirAnalista(id) {
  await conexao.execute('DELETE FROM analista WHERE id_analista = ?', [id]);
}

module.exports = {
  listarAnalistas,
  buscarAnalistaPorId,
  criarAnalista,
  atualizarAnalista,
  excluirAnalista,
};
