const express = require('express');

const app = express();
const router = new express.Router();

router.get('*', (req, res) => {
    res.send({ message: 'Hello world!'});
});

app.use(express.json());
app.use(router);

module.exports = app;
