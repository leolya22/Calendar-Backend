const express = require( 'express' );
require( 'dotenv' ).config();
const port = process.env.PORT;

const app = express();

app.use( express.static( 'public' ) );
app.use( '/api/auth', require( './routes/auth' ) );

app.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
});