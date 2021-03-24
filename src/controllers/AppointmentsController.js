const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { host_id } = request.query;
    const appointments = !!host_id
      ? await connection("appointments").where("host_id", host_id)
      : await connection("appointments").select("*");

    return response.json(appointments);
  },
  async create(request, response) {
    const { start_time, end_time, status } = request.body;
    const host_id = request.headers.authorization;

    const [id] = await connection("appointments")
      .insert({
        host_id,
        start_time,
        end_time,
        status,
      })
      .catch(() => {
        return response.json({ error: "DB error" });
      });

    return response.json({ id });
  },
  async client_interest(request, response) {
    const { id } = request.params;
    const { client_id } = request.body;

    const clients_list = await connection("appointments")
      .where("id", id)
      .select("clients_list")
      .catch((error) => {
        console.log(error);
        return response.json({ error: error });
      });

    if (!clients_list.length) {
      return response.status(401).json({ error: "Item not found." });
    }

    var new_clients_list = clients_list[0]["clients_list"];
    new_clients_list =
      new_clients_list === null ? [] : JSON.parse(new_clients_list);
    new_clients_list.push(client_id);
    new_clients_list = JSON.stringify(new_clients_list);

    const appointment = await connection("appointments")
      .where("id", id)
      .update({ status: 1, clients_list: new_clients_list });

    return response.status(204).send();
  },
  async client_confirm(request, response) {
    const { id } = request.params;
    const { client_id } = request.body;

    const appointment = await connection("appointments")
      .where("id", id)
      .update({ status: 2, client_id: client_id });

    return response.status(204).send();
  },
  async delete(request, response) {
    const { id } = request.params;
    const host_id = request.headers.authorization;

    const appointment = await connection("appointments")
      .where("id", id)
      .select("host_id")
      .first();

    if (appointment.host_id !== host_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("appointments").where("id", id).delete();

    return response.status(204).send();
  },
};
