const { Router } = require( 'express' );
const { check } = require('express-validator');


const { crearUsuario, loginUsuario, revalidarToken } = require( '../controllers/auth' );
const validarCampos = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = Router();

router.post( 
    '/new',
    [
        check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
        check( 'email', 'El e-mail es invalido' ).isEmail(),
        check( 'password', 'La contraseña debe tener minimo 6 caracteres' ).isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);
router.post( 
    '/',
    [
        check( 'email', 'El e-mail es invalido' ).isEmail(),
        check( 'password', 'La contraseña debe tener minimo 6 caracteres' ).isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);
router.get( '/renew', validarJWT, revalidarToken);

module.exports = router;