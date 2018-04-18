exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('decks', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('cards');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('decks'),
  ]);
};