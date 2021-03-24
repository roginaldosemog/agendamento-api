exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.increments();
    table.string("host_id").notNullable();          // String to identify appointment's host
    table.datetime("start_time").notNullable();     // Datetime indicating appointment's start
    table.datetime("end_time").notNullable();       // Datetime indicating appointment's end
    table.decimal("status").notNullable();          // Status code (0: no client, 1: client(s) interested, 2: client selected)
    table.json("clients_list");                     // List of interested clients
    table.string("client_id");                      // Final client
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
