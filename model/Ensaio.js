class Ensaio {
  constructor({ id_ensaio = null, nome, norma, status } = {}) {
    this.id_ensaio = id_ensaio;
    this.nome = nome;
    this.norma = norma;
    this.status = status;
  }

  validar() {
    const erros = [];

    if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      erros.push('O nome deve possuir pelo menos 3 caracteres.');
    }
    if (typeof this.norma !== 'string' || !this.norma.trim()) {
      erros.push('A norma não pode ficar vazia.');
    }
    if (typeof this.status !== 'string' || !this.status.trim()) {
      erros.push('O status não pode ficar vazio.');
    }

    return erros;
  }
}

module.exports = Ensaio;
