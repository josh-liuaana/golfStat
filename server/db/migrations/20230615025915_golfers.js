exports.up = function (knex) {
  return knex.schema.createTable('golfers', (table) => {
    table.uuid('id')
    table.string('name')
    table.decimal('handicap_index', 3, 1)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('golfers')
}
