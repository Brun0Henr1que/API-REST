const Sequelize = require('sequelize');

const database = require('./db.js');

const Credenciais = database.define('credenciais',{
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Credenciais;