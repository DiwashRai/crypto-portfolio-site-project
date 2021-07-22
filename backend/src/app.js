const express = require('express');
require('./db/mongoose');

const app = express();
const router = new express.Router();

router.get('*', (req, res) => {
    res.status(404).send({ error: 'Invalid route'});
});

app.use(express.json());
app.use(router);

module.exports = app;
