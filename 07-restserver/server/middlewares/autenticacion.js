const jwt = require('jsonwebtoken');

// ============================
//  Verificar token
// ============================
const verificaToken = (req, res, next) => {
    //con req.get puedo acceder a los headers
    let token = req.get('token'); //O tambien Authorization
    //Verifico que el token exista con ese seed
    jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: `Token no valido`
                    }
                })
            }
            //Retorno mi usuario decodificado
            req.usuario = decoded.usuario;
            next();
        })
        //Sin el next, la funcion que llame a esta misma funcion, nunca va a continuar
        //y va a morir justo luego de la llamada a verificaToken
}

// ============================
//  Verifica AdminRole
// ============================
const verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            err: {
                message: `El usuario no es administrador`
            }
        })
    }
    next();
}

// ============================
//  Verifica token para img
// ============================
const verificaTokenImg = (req, res, next) => {
    //Recibimos el token por url
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: `Token no valido`
                }
            })
        }
        //Retorno mi usuario decodificado
        req.usuario = decoded.usuario;
        next();
    })
}

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
}