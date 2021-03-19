const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { doctor_id } = request.query;
    const appointments = !!doctor_id
      ? await connection("appointments").where("doctor_id", doctor_id)
      : await connection("appointments").select("*");

    return response.json(appointments);
  },
  async create(request, response) {
    const { start_time, end_time, status, focus } = request.body;
    const doctor_id = request.headers.authorization;

    const [id] = await connection("appointments").insert({
      doctor_id,
      start_time,
      end_time,
      status,
      focus,
    });

    return response.json({ id });
  },
  async patient_interest(request, response) {
    const { id } = request.params;
    const { patient_id } = request.body;

    const patients_list = await connection("appointments")
      .where("id", id)
      .select("patients_list");
    
    if (!patients_list.length) {
      return response.status(401).json({ error: "Item not found." });
    }
    
    var new_patients_list = patients_list[0]["patients_list"];
    new_patients_list = new_patients_list === null
      ? [] : JSON.parse(new_patients_list);
    new_patients_list.push(patient_id)
    new_patients_list = JSON.stringify(new_patients_list)
      
    const appointment = await connection("appointments")
      .where("id", id)
      .update({ status: 1, patients_list: new_patients_list });

    return response.status(204).send();
  },
  async patient_confirm(request, response) {
    const { id } = request.params;
    const { patient_id } = request.body;
      
    const appointment = await connection("appointments")
      .where("id", id)
      .update({ status: 2, patient_id: patient_id });

    return response.status(204).send();
  },
  async delete(request, response) {
    const { id } = request.params;
    const doctor_id = request.headers.authorization;

    const appointment = await connection("appointments")
      .where("id", id)
      .select("doctor_id")
      .first();

    if (appointment.doctor_id !== doctor_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("appointments").where("id", id).delete();

    return response.status(204).send();
  },
};
