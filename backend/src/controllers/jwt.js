const jwt = require('jsonwebtoken');
const secret = 'JavaScript'

// gerar token
function jwt_gen(id){
    const token = jwt.sign({user_id: id}, secret, {
        expiresIn: 900
    });
    return token;
};

// verificar validade do token
function jwt_valid(req, res, next){
    const token = req.body.token;
    var decoded = jwt.verify(token, secret, (err, decode)=>{
        if (err) return res.status(401).end();

        req.user_id = decode.user_id
        next()
    });
};

function jwt_valid_resource(req, res, next){
    const token = req.body.token;
    var decoded = jwt.verify(token, secret, (err, decode)=>{
        if (err) return res.status(401).end();

        res.status(200).json({valido: true})
        next()
    });
};

// extrair o id do token
function jwt_auth(token){
    var decoded = jwt.verify(token, secret);
    return decoded.user_id;
};

module.exports = {
    jwt_gen,
    jwt_auth,
    jwt_valid,
    jwt_valid_resource
};