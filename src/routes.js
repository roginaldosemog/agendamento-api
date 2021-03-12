const express = require("express");
const crypto = require("crypto");

const connection = require("./database/connection");

const routes = express.Router();

routes.get("/doctors", async (request, response) => {
  const doctors = await connection("doctors").select("*");

  return response.json(doctors);
});

routes.post("/doctors", async (request, response) => {
  const { name } = request.body;
  const id = crypto.randomBytes(4).toString("HEX");

  await connection("doctors").insert({
    id,
    name,
  });

  return response.json({ id });
});

module.exports = routes;
