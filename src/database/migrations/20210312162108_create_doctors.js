exports.up = function (knex) {
  return knex.schema.createTable("doctors", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    // TODO: Necessary data for appointment
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("doctors");
};
