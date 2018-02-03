'use strict';

const request = require( 'request' )

const getStats = function( url ) {
  this.url = url
}

getStats.prototype.req = function( callback ) {
  const options = { url: this.url, method: 'HEAD' }
  const start = new Date().getTime();
  request( options, ( error, response, body ) => {
    const time = ( new Date().getTime() - start ) / 1000; // Seconds
    const result = {
      error: error,
      response: response,
      time: time
    }

    callback( result )
  } )
}

module.exports = getStats;
