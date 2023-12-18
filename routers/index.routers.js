const express = require('express');
const imagenes = require('./images.router');
const usuarios = require('./users.router');

//function routers
function router(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/imagenes', imagenes);
    router.use('/usuarios', usuarios);

}

module.exports = router;