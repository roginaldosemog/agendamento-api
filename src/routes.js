const express = require('express');

const routes = express.Router();

routes.post('/doctors', (request, response) => {
    const body = request.body;
    const query = request.query;
    const params = request.params;

    console.log(body);
    console.log(query);
    console.log(params);

    return response.json({
        status_code: 200,
    });
});

module.exports = routes;