exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.increments();
    table.string("time").notNullable();
    table.decimal("status_code").notNullable();
    // TODO: appointment focus

    table.string("doctor_id").notNullable();
    table.foreign("doctor_id").references("id").inTable("doctors");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
