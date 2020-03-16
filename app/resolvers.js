module.exports = {
  Query: {
    users: (parent, args, { knex, auth }) => {
      console.log(auth)
      return knex.select(['id', 'name']).from('users')
    },
    messages: () => 'messages',
    chats: () => 'chats'
  },
  Mutation: {
    async enter(parent, { name }, { knex }) {
      let user = await knex('users').where('name', name)
      user = user[0]
      if (!user) {
        await knex('users').insert({ name, created_at: Date.now(), updated_at: Date.now() })
        user = await knex('users').where('name', name)
        user = user[0]
      }
      return user
    }
  }
}
