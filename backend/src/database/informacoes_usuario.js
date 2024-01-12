const Sequelize = require('sequelize');

const database = require('./db.js');

const Informacoes_usuario = database.define('informacoes_usuario',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    nome_pai:{
        type: Sequelize.STRING
    },
    nome_mae: {
        type: Sequelize.STRING
    },
    genero: {
        type: Sequelize.STRING
    }

});


module.exports = Informacoes_usuario;