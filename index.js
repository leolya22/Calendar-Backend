const express = require( 'express' );
const cors = require( 'cors' );
require( 'dotenv' ).config();

const router = require( './routes/auth' );
const { dbConnection } = require('./database/config');


const port = process.env.PORT;
const app = express();
dbConnection();
app.use( cors() );

app.use( express.static( 'public' ) );
app.use( express.json() );
app.use( '/api/auth', router );

app.listen( port, () => {
    console.log( `Servidor corriendo en el puerto ${ port }` );
});