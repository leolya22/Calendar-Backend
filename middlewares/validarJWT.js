const { response } = require( 'express' );
const jwt = require( 'jsonwebtoken' )


const validarJWT = ( req, res = response, next ) => {
    const token = req.header( 'x-token' );
    if( !token ) {
        return res.status( 401 ).json({
            ok: false,
            message: 'No hay token'
        })
    }
    
    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.JWT_SECRET_WORD
        );
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status( 401 ).json({
            ok: false,
            message: 'Token invalido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}