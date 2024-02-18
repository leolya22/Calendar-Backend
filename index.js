const express = require( 'express' );
require( 'dotenv' ).config();
const router = require( './routes/auth' );
const { dbConnection } = require('./database/config');


const port = process.env.PORT;
const app = express();
dbConnection();

app.use( express.static( 'public' ) );
app.use( express.json() );
app.use( '/api/auth', router );

app.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
});