exports.up = function (knex) {
  return knex.schema.createTable("appointments", function (table) {
    table.increments();
    table.string("doctor_id").notNullable();        // Doctor ID
    table.datetime("start_time").notNullable();     // Starting time to appointment
    table.datetime("end_time").notNullable();       // Ending time to appointment
    table.decimal("status").notNullable();          // Status code (0: no patient, 1: patient(s) interested, 2: patient selected)
    table.string("focus").notNullable();            // Occupation area
    table.json("patients_list");                    // List of intrested patients
    table.string("patient_id");                     // Final patient
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("appointments");
};
