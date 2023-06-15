exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('courses').del()
  await knex('courses').insert([
    {
      id: 1,
      name: 'Ohariu Valley',
      distance: 4013,
      slope: 107,
      par: 66,
      par_per_hole: '4,4,3,3,5,4,3,4,3,4,4,3,3,5,4,3,4,3',
    },
  ])
}
