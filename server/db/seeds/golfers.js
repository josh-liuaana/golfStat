exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('golfers').del()
  await knex('golfers').insert([
    {
      id: '7fe67614-2735-4b0c-8de5-f8cf3c303397',
      name: `Josh Liua'ana`,
      handicap_index: 13.8,
    },
  ])
}
