'use strict';

var _ = require("underscore");

var qStringUtils = {

  getQString: function( qStringKey, options ) {

    var qStringSplit = "";

    var qStringAry = location.search.slice(1).split('&');

    var caseSensitive = 
        ( typeof options !== 'undefined' && options.hasOwnProperty( 'caseSensitive' ) ) 
        ? options.caseSensitive 
        : false;
    
    var qString = _(qStringAry).find(function( qParam ){
      var searchString = ( !caseSensitive )
          ? new RegExp('^' + qStringKey, 'i')
          : new RegExp('^' + qStringKey);
      return searchString.test( qParam );
    });

    if ( typeof qString == 'undefined') {
      return false;
    }

    qStringSplit = qString.split('=');

    if ( qStringSplit.length == 0 ) {
      return false;
    }

    return qStringSplit[1];

  },

  getRestVal: function( key ) {

    var restfulPathAry = location.pathname.split('/');

    var keyIndex = _( restfulPathAry ).indexOf( key );

    if (keyIndex <= 0) {
      return false;
    }
    else if ( keyIndex++ == restfulPathAry.length ) {
      return false;
    }

    return restfulPathAry[ keyIndex++ ];

  }

}

module.exports = qStringUtils;