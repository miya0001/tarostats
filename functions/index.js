'use strict';

const functions = require( 'firebase-functions' )
const getStats = require( './lib/getstats' )

exports.checkstats = functions.pubsub.topic( 'checkstats' ).onPublish( ( event ) => {
  const st = new getStats( 'https://miya.io/' );
  st.req( ( res ) => {
    console.log( res )
  } )
} );
