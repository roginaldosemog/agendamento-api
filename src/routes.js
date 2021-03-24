const express = require("express");

const AppointmentsController = require("./controllers/AppointmentsController");

const routes = express.Router();

routes.get("/appointments", AppointmentsController.index);
routes.post("/appointments", AppointmentsController.create);
routes.patch("/appointments/interest/:id", AppointmentsController.client_interest);
routes.patch("/appointments/confirm/:id", AppointmentsController.client_confirm);
routes.delete("/appointments/:id", AppointmentsController.delete);

module.exports = routes;
