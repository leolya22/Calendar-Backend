const { response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );

const { generarJWT } = require('../helpers/jwt');
const Usuario = require( '../models/Usuario' );


const crearUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        if( usuario ) {
            return res.status( 400 ).json({
                ok: false,
                message: 'Este email ya esta registrado. Por favor inicie la sesion con este mail o elija otro mail que no este registrado!',
            })
        }
        usuario = new Usuario( req.body );
        
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        await usuario.save();
        const jwt = await generarJWT( usuario.id, usuario.name );

        res.status( 201 ).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            jwt,
        })
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado del server al registrar el usuario. Contactese con nuestra mesa de ayuda!',
        })
    }
}


const loginUsuario = async ( req, res = response ) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if( !usuario ) {
            return res.status( 400 ).json({
                ok: false,
                message: 'Este email aun no esta registrado. Por favor haga el registro!',
            })
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status( 400 ).json({
                ok: false,
                message: 'La contraseña es invalida, por favor pruebe de nuevo!',
                email,
            })
        }

        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            message: 'Usted se logueo correctamente',
            name: usuario.name,
            uid: usuario.id,
            token,
        })
    } catch (error) {
        res.status( 500 ).json({
            ok: false,
            message: 'Error inesperado del server al ingresar. Contactese con nuestra mesa de ayuda!',
        })
    }
}


const revalidarToken = async ( req, res = response ) => {
    const token = await generarJWT( req.uid, req.name );

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}