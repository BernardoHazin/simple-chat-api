exports.up = function(knex) {
  return knex.schema.createTable('messages', t => {
    t.increments('id').primary()
    t.text('message').notNullable()
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
    t.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('messages')
}

exports.config = {}
