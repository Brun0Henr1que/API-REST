const express = require('express');
var controller = require('./controllers/CRUD.js')
const jwt = require('./controllers/jwt.js')


const router = express.Router();

router.post('/cadastro_credenciais', controller.inserir_dados_credenciais);
router.post('/auth', controller.verificar_login);
router.get('/resource', jwt.jwt_valid_resource);
router.post('/inserir_dados', jwt.jwt_valid, controller.inserir_dados_informacoes_usuario);
router.get('/dados_usuario', jwt.jwt_valid, controller.informacoes_usuario);
router.delete('/dados_usuario', jwt.jwt_valid, controller.excluir_registro);
router.put('/atualizar_dados', jwt.jwt_valid, controller.atualizar_dados);

module.exports = router;
