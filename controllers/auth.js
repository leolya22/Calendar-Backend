const express = require( 'express' );


const crearUsuario = ( req, res ) => {
    res.json({
        ok: true,
        message: 'registro'
    })
}
const loginUsuario = ( req, res ) => {
    res.json({
        ok: true,
        message: 'login'
    })
}
const revalidarToken = ( req, res ) => {
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