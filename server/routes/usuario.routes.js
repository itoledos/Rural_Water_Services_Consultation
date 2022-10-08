const UsuarioController = require('../controllers/usuario.controller');

module.exports = (app) => {
    app.post("/api/consumers/usuario", UsuarioController.registrar);
    app.post('/api/consumers/login', UsuarioController.login);
}