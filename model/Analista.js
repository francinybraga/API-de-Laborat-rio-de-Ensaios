class Analista {
  constructor({ id_analista = null, nome, registro, especialidade } = {}) {
    this.id_analista = id_analista;
    this.nome = nome;
    this.registro = registro;
    this.especialidade = especialidade;
  }

  validar() {
    const erros = [];

    if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      erros.push('O nome deve possuir pelo menos 3 caracteres.');
    }
    if (typeof this.registro !== 'string' || !this.registro.trim()) {
      erros.push('O registro não pode ficar vazio.');
    }
    if (typeof this.especialidade !== 'string' || !this.especialidade.trim()) {
      erros.push('A especialidade não pode ficar vazia.');
    }

    return erros;
  }
}

module.exports = Analista;
