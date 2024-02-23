const moment = require("moment");



const isDate = ( value, { req, location, path } ) => {
    if( !value ) {
        return false;
    }

    const fecha = moment( value );
    console.log(fecha.isValid());
    return fecha.isValid();
}

module.exports = {
    isDate
};