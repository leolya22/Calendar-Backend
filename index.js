const express = require( 'express' );
require( 'dotenv' ).config();
const router = require( './routes/auth' );


const port = process.env.PORT;
const app = express();

app.use( express.static( 'public' ) );
app.use( express.json() );
app.use( '/api/auth', router );

app.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
});