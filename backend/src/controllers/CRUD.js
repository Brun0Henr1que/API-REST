const Credenciais = require('../database/credenciais');
const query = require('../database/db_execucao');
const Informacoes_usuario = require('../database/informacoes_usuario.js');
const jwt = require('./jwt.js')
const crypto = require('crypto');

// CREATE
const inserir_dados_credenciais = async(req, res)=>{
    const user_email = await Credenciais.findOne({
        attributes: ['email'],
        where: {
            email: req.body.email
        }
    });
    if (user_email === null){
        const dados_inseridos = await query.insertDataCredencials(req.body);
        return res.status(201).json({message: "Cadastro realizado com sucesso. Siga para o login"});
    }else{
        return res.status(400).json({message: "usuario já possui cadastro"})
    };
};

const verificar_login = async(req, res) => {
    const user = await Credenciais.findOne({
        attributes: ['user_id','email', 'senha'], 
        where:{
            email: req.body.email
        }
    })
    if (user === null){
        return res.status(400).json({auth: false, message:'usuário ou senha incorretos'})
    };
    if ((user.email === req.body.email) && (user.senha === crypto.createHash('sha256').update(req.body.senha).digest('hex'))){
        return res.status(200).json({auth: true, message: 'login bem sucedido', token: `${jwt.jwt_gen(user.user_id)}`})
    }else{
        return res.status(400).json({auth: false, message:'usuário ou senha incorretos'})
    };
};

const inserir_dados_informacoes_usuario = async(req, res)=>{
    const token_id = await jwt.jwt_auth(req.body.token);
    const dado_existente = await Informacoes_usuario.findOne({where: {id: token_id}})
    if (dado_existente === null){
        const dados_inseridos = await query.insertDataInfoUser(req.body);
        return res.status(201).json({message: "Dados cadastrais inseridos com sucesso", Id: dados_inseridos.id});
    }
    return res.status(400).json({message: "Este usuario já cadastrou seus dados"}).end();
};

// READ
const informacoes_usuario = async(req, res) =>{
    const token_id = await jwt.jwt_auth(req.body.token);
    const info_display = await query.getData(token_id);
    return res.status(200).json(info_display);
};

// UPDATE 
const atualizar_dados = async(req, res) => {
    const token_id = await jwt.jwt_auth(req.body.token);
    await query.updateData(token_id, req.body);
    return res.status(201).json({message: "Dados atualizados com sucesso"});
};

// DELETE
const excluir_registro = async(req, res) => {
    const token_id = await jwt.jwt_auth(req.body.token);
    await query.deleteData(token_id);
    return res.status(200).json({message: "Conta excluída com sucesso", id: `${token_id}`});
};

module.exports ={
    informacoes_usuario,
    inserir_dados_credenciais,
    inserir_dados_informacoes_usuario,
    verificar_login,
    excluir_registro,
    atualizar_dados
}