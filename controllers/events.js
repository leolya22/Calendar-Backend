const { response } = require( 'express' );
const Evento = require('../models/Evento');

const getEventos = async ( req, res = response ) => {
    const eventos = await Evento.find().populate( 'user', 'name' );

    res.status( 201 ).json({
        ok: true,
        eventos
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
const actualizarEvento = async ( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status( 404 ).json({
                ok: false,
                message: 'No se encontro ningun evento con ese id'
            })
        }
        if( evento.user.toString() != uid ) {
            return res.status( 401 ).json({
                ok: false,
                message: 'No tiene permisos para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        return res.json({
            ok: true,
            eventoActualizado
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            message: 'Ocurrio un error inesperado'
        })
    }
}
const eliminarEvento = async ( req, res = response ) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );

        if( !evento ) {
            return res.status( 404 ).json({
                ok: false,
                message: 'No se encontro ningun evento con ese id'
            })
        }
        if( evento.user.toString() != uid ) {
            return res.status( 401 ).json({
                ok: false,
                message: 'No tiene permisos para borrar este evento'
            })
        }

        const eventoBorrado = await Evento.findByIdAndDelete( eventoId );
        return res.json({
            ok: false,
            eventoBorrado
        })

    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json({
            ok: false,
            message: 'Ocurrio un error inesperado'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}