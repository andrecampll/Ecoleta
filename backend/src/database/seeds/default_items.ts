import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('itens').insert([
    { title: 'Lâmparadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Residuos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Residuos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ]);
}
