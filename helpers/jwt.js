const jwt = require('jsonwebtoken');

const secretJWT = process.env.JWT_SECRET_WORD;


const generarJWT = ( uid, name ) => {
    return new Promise(( resolve, reject ) => {

        const payload = { uid, name };
        
        jwt.sign( payload, secretJWT, {
            expiresIn: '2h'
        }, ( error, token ) => {
            
            if( error ) {
                console.log( error );
                reject( 'No se pudo generar el token' );
            }
            resolve( token );
        });
    })
}

module.exports = {
    generarJWT,
}