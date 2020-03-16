exports.up = function(knex) {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary()
    t.string('name')
      .notNullable()
      .unique()
    t.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}

exports.config = {}
