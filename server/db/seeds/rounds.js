exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('rounds').del()
  await knex('rounds').insert([
    {
      id: 1,
      course_id: 1,
      golfer_id: '7fe67614-2735-4b0c-8de5-f8cf3c303397',
      putts: '1,2,2,1,3,2,2,1,2,1,1,2,2,3,2,1,1,2',
      gir: 'true,true,false,true,false,true,false,true,true,true,true,false,true,false,true,false,true,true',
      fir: 'true,true,false,false,false,false,false,false,false,true,true,false,false,true,true,false,true,false',
      gross: '3,4,3,4,3,4,5,5,4,3,4,5,5,6,6,5,5,6',
    },
    {
      id: 2,
      course_id: 1,
      golfer_id: '7fe67614-2735-4b0c-8de5-f8cf3c303397',
      putts: '1,2,3,2,2,2,2,3,3,2,3,2,1,2,2,3,2,2',
      gir: 'true,false,true,true,true,true,false,true,false,true,false,true,true,true,true,false,true,false',
      fir: 'true,true,false,false,true,false,false,true,false,true,false,false,false,true,true,false,true,false',
      gross: '5,4,5,3,6,3,6,6,5,3,4,3,4,5,4,3,4,5',
    },
    {
      id: 3,
      course_id: 2,
      golfer_id: '7fe67614-2735-4b0c-8de5-f8cf3c303397',
      putts: '2,3,2,3,2,1,3,2,3,1,2,3,3,2,3,1,2,1',
      gir: 'false,true,false,true,false,true,false,false,false,true,false,false,true,false,true,false,true,false',
      fir: 'true,true,false,false,true,false,false,true,false,true,false,false,false,false,true,false,true,false',
      gross: '6,5,4,5,5,6,4,6,4,5,3,6,5,3,6,6,6,5',
    },
  ])
}
