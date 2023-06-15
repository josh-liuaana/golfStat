exports.up = function (knex) {
  return knex.schema.createTable('rounds', (table) => {
    table.increments('id')
    table.integer('course_id')
    table.string('golfer_id')
    table.text('putts')
    table.text('gir')
    table.text('fir')
    table.text('gross')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('rounds')
}
