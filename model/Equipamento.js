class Equipamento {
  constructor({ id_equipamento = null, nome, patrimonio, situacao } = {}) {
    this.id_equipamento = id_equipamento;
    this.nome = nome;
    this.patrimonio = patrimonio;
    this.situacao = situacao;
  }

  validar() {
    const erros = [];

    if (typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      erros.push('O nome deve possuir pelo menos 3 caracteres.');
    }
    if (typeof this.patrimonio !== 'string' || !this.patrimonio.trim()) {
      erros.push('O patrimônio não pode ficar vazio.');
    }
    if (typeof this.situacao !== 'string' || !this.situacao.trim()) {
      erros.push('A situação não pode ficar vazia.');
    }

    return erros;
  }
}

module.exports = Equipamento;
