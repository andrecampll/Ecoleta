import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('itens').insert([
    { title: 'Lâmpadas', image: 'lampadasdark.png' },
    { title: 'Pilhas e Baterias', image: 'bateriasdark.png' },
    { title: 'Papéis e Papelão', image: 'papeis-papelaodark.png' },
    { title: 'Residuos Eletrônicos', image: 'eletronicosdark.png' },
    { title: 'Residuos Orgânicos', image: 'organicosdark.png' },
    { title: 'Óleo de Cozinha', image: 'oleodark.png' },
  ]);
}
