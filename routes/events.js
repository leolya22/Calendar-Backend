const { Router } = require( 'express' );
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validarJWT');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const validarCampos = require('../middlewares/validarCampos');
const { isDate } = require('../helpers/isDate');


const calendarRouter = Router();

calendarRouter.use( validarJWT );

calendarRouter.get( '/', getEventos );
calendarRouter.post( 
    '/',
    [
        check( 'title', 'El titulo es obligatorio' ).not().isEmpty(),
        check( 'start', 'Fecha de inicio es obligatoria' ).custom( isDate ),
        check( 'end', 'Fecha de finalizacion es obligatoria' ).custom( isDate ),
        validarCampos
    ],
    crearEvento
);
calendarRouter.put( '/:id', actualizarEvento );
calendarRouter.delete( '/:id', eliminarEvento );

module.exports = calendarRouter;