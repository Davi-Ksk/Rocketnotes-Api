const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) { //middleware recebe next
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token não informado', 401);
    }

    const [, token] = authHeader.split(" "); //bearer, token

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret); //se token for válido devolve o sub e passa a chamr de user_id
        
        request.user = {
            id: Number(user_id) //extrai id do usuário e coloca na requisição
        }

        return next();
    }   catch {
        throw new AppError('JWT token inválido', 401);
    }
}

module.exports = ensureAuthenticated;