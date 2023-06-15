exports.up = function (knex) {
  return knex.schema.createTable('courses', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('distance')
    table.integer('slope')
    table.integer('par')
    table.string('par_per_hole')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('courses')
}
