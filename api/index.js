const express = require( 'express' );
const cors = require( 'cors' );
require( 'dotenv' ).config();

const router = require( './routes/auth' );
const { dbConnection } = require('./database/config');
const calendarRouter = require('./routes/events');


const app = express();
dbConnection();
app.use( cors() );

app.use( express.static( 'public' ) );
app.use( express.json() );
app.use( '/api/auth', router );
app.use( '/api/calendar', calendarRouter );

app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` );
});