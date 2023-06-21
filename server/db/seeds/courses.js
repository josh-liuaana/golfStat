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
    {
      id: 2,
      name: 'Shandon',
      distance: 5477,
      slope: 117,
      par: 70,
      par_per_hole: '5,4,3,4,4,4,3,5,3,4,3,4,4,3,5,4,4,4',
    },
    {
      id: 3,
      name: 'Wanaka',
      distance: 5484,
      slope: 122,
      par: 70,
      par_per_hole: '4,3,4,4,4,3,4,4,4,5,4,4,3,4,3,5,4,4',
    },
    {
      id: 4,
      name: 'Te Marua',
      distance: 5570,
      slope: 117,
      par: 71,
      par_per_hole: '4,3,5,4,4,3,5,4,3,5,3,4,4,5,3,4,4,4',
    },
    {
      id: 5,
      name: 'Wainuiomata',
      distance: 5489,
      slope: 120,
      par: 72,
      par_per_hole: '4,3,4,4,5,4,5,4,3,4,3,5,3,5,4,4,4,4',
    },
  ])
}
