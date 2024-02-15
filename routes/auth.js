const { Router } = require( 'express' );


const router = Router();

router.post( './new', ( req, res ) => {
    res.json({
        ok: true,
        message: 'registro'
    })
});
router.post( './', ( req, res ) => {
    res.json({
        ok: true,
        message: 'login'
    })
});
router.get( './renew', ( req, res ) => {
    res.json({
        ok: true,
        message: 'renew'
    })
});

module.exports = router;