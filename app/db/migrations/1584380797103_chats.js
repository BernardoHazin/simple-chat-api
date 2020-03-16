exports.up = function(knex) {
  return knex.schema.createTable('chats', t => {
    t.increments('id').primary()
    t.string('name')
      .notNullable()
      .unique()
    t.integer('admin')
      .references('id')
      .inTable('users')
    t.boolean('is_public').defaultTo(true)
    t.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('chats')
}

exports.config = {}
