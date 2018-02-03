'use strict';

const expect = require( 'chai' ).expect;
const http = require( 'http' );

const runserver = function( responseCode ) {
  return http.createServer( ( req, res ) => {
    res.writeHead( responseCode, {
        "Content-Type": "text/html"
    } );
    res.write( "<h1>Hello World</h1>" );
    res.end();
  } ).listen( 8080 )
}

const mockserver = 'http://127.0.0.1:8080';

describe('Get the http status', () => {

  it( 'Send http request to the website', ( done ) => {
    const getStats = require( '../functions/lib/getstats' );
    const st = new getStats( 'https://miya.io/' );
    st.req( ( result ) => {
      expect( result.time > 0 ).to.equal( true );
      expect( result.error ).to.equal( null );
      expect( result.response.statusCode ).to.equal( 200 );
      done()
    } )
  } );

  it( 'It should get 404', ( done ) => {
    const getStats = require( '../functions/lib/getstats' );
    const st = new getStats( 'https://miya.io/404-not-found' );
    st.req( ( result ) => {
      expect( result.time > 0 ).to.equal( true );
      expect( result.error ).to.equal( null );
      expect( result.response.statusCode ).to.equal( 404 );
      done()
    } )
  } );

  it( 'It should get status 200', ( done ) => {
    const server = runserver( 200 );
    const getStats = require( '../functions/lib/getstats' );
    const st = new getStats( mockserver );
    st.req( ( result ) => {
      expect( result.time > 0 ).to.equal( true );
      expect( result.error ).to.equal( null );
      expect( result.response.statusCode ).to.equal( 200 );
      server.close( done )
    } )
  } );

  it( 'It should get status 500', ( done ) => {
    const server = runserver( 500 );
    const getStats = require( '../functions/lib/getstats' );
    const st = new getStats( mockserver );
    st.req( ( result ) => {
      expect( result.time > 0 ).to.equal( true );
      expect( result.error ).to.equal( null );
      expect( result.response.statusCode ).to.equal( 500 );
      server.close( done )
    } )
  } );

  it( 'It should get error to connect', ( done ) => {
    const getStats = require( '../functions/lib/getstats' );
    const st = new getStats( mockserver );
    st.req( ( result ) => {
      expect( result.time > 0 ).to.equal( true );
      expect( result.error.errno ).to.equal( 'ECONNREFUSED' );
      expect( result.error.code ).to.equal( 'ECONNREFUSED' );
      expect( result.response ).to.equal( undefined );
      done()
    } )
  } );

} );
