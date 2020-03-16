exports.up = function(knex) {
  return knex.schema.createTable('chat_messages', t => {
    t.increments('id').primary()
    t.integer('chat_id')
      .references('id')
      .inTable('chats')
      .onDelete('cascade')
      .onUpdate('cascade')
    t.integer('message_id')
      .references('id')
      .inTable('messages')
      .onDelete('cascade')
      .onUpdate('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('chat_messages')
}

exports.config = {}
