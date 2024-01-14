const database = require('./db.js');
const Credenciais = require('./credenciais.js');
const Informacoes_usuario = require('./informacoes_usuario.js');const sequelize = require('./db.js');
const crypto = require('crypto');

const getData = async(id) => {
    await database.sync();
    const info = await Informacoes_usuario.findAll({where: {id: id}});
    return info;
};

const insertDataCredencials = async(login) => {
    const {email} = login;
    const {senha} = login;
    const senha_hash = crypto.createHash('sha256').update(senha).digest('hex');
    const dados = await Credenciais.create({email: `${email}`, senha: `${senha_hash}`});
    return dados;
};

const insertDataInfoUser = async(cadastro) => {
    const {nome} = cadastro;
    const {sobrenome} = cadastro;
    const {idade} = cadastro;
    const {endereco} = cadastro;
    const {data_nascimento} = cadastro;
    const {nome_pai} = cadastro;
    const {nome_mae} = cadastro;
    const {genero} = cadastro;
    

    const dados = await Informacoes_usuario.create({nome: `${nome}`, sobrenome: `${sobrenome}`, idade: `${idade}`, endereco: `${endereco}`, data_nascimento: `${data_nascimento}`,
    nome_pai: `${nome_pai}`, nome_mae: `${nome_mae}`, genero: `${genero}`});
    return dados;
};

const deleteData = async(id) => {
    await database.sync();
    await Informacoes_usuario.destroy({where: {id: id}});
    await Credenciais.destroy({where: {user_id: id}});
};

const updateData = async(id, dado) => {
    await database.sync();
    const {campo_alterar} = dado;
    const {novo_dado} = dado;
    const [dados, meta_dados] = await sequelize.query(`UPDATE Informacoes_usuarios SET ${campo_alterar} = "${novo_dado}" WHERE id = ${id}`);
};

module.exports = {
    getData,
    insertDataCredencials,
    insertDataInfoUser,
    deleteData,
    updateData
};
