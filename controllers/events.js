const { response } = require( 'express' );
const Evento = require('../models/Evento');

const getEventos = ( req, res = response ) => {
    res.status( 201 ).json({
        ok: true,
        message: 'getEventos'
    })
}
const crearEvento = async ( req, res = response ) => {
    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        const eventoDB = await evento.save();

        res.json({
            ok: true,
            eventoDB
        })
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: true,
            message: 'Ocurrio un error inesperado'
        })
    }
}
const actualizarEvento = ( req, res = response ) => {
    res.status( 201 ).json({
        ok: true,
        message: 'actualizarEvento'
    })
}
const eliminarEvento = ( req, res = response ) => {
    res.status( 201 ).json({
        ok: true,
        message: 'eliminarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}