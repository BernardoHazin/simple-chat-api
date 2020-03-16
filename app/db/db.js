const chalk = require('chalk')
const path = require('path')
const { log } = console

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './data.sqlite'
  },
  migrations: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, 'migrations')
  },
  log: {
    warn(message) {
      console.log(chalk.bgYellow('WARN'), chalk.yellow(message))
    },
    error(message) {
      console.log(chalk.bgRed('ERROR'), chalk.red(message))
    },
    deprecate(message) {
      console.log(chalk.bgYellow('DEPRECATE'), chalk.yellow(message))
    }
  }
})

knex.migrate.rollback()
knex.migrate.up()

module.exports = knex
