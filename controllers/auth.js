const { response } = require( 'express' );
const Usuario = require( '../models/Usuario' );
const bcryptjs = require( 'bcryptjs' );


const crearUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if( usuario ) {
            return res.status( 400 ).json({
                ok: false,
                message: 'Este email ya esta registrado',
            })
        }
        usuario = new Usuario( req.body );
        
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
        
        await usuario.save();

        res.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
        })
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado al registrar el usuario',
        })
    }
}


const loginUsuario = ( req, res = response ) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        message: 'login',
        email,
        password
    })
}


const revalidarToken = ( req, res = response ) => {
    res.json({
        ok: true,
        message: 'renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}