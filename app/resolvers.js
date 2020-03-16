module.exports = {
  Query: {
    users: (parent, args, { knex, ctx }, info) => {
      return knex.select(['id', 'name']).from('users')
    },
    messages: () => 'messages',
    chats: () => 'chats'
  },
  Mutation: {
    addUser(parent, args, { knex }, info) {}
  }
}
