const { Router } = require( 'express' );

const { validarJWT } = require('../middlewares/validarJWT');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');


const calendarRouter = Router();

calendarRouter.use( validarJWT );

calendarRouter.get( '/', getEventos );
calendarRouter.post( '/', crearEvento );
calendarRouter.put( '/:id', actualizarEvento );
calendarRouter.delete( '/:id', eliminarEvento );

module.exports = calendarRouter;