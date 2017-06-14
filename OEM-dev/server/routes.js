/**
 * Main application routes
 */

'use strict';

var express = require('express');
var errors = require('./components/errors');
//var cors = require('./auth/middleware/cors.js');
var path = require('path');
var config = require('./config/environment');

module.exports = function (app) {

//    app.use(cors);


    // Insert routes below
    app.use('/api/agents', require('./api/agent'));
    app.use('/api/manufacture', require('./api/manufacture_transaction'));
    app.use('/api/install', require('./api/install_transaction'));
    app.use('/api/loan', require('./api/loan_transaction'));
    app.use('/api/sell', require('./api/sell_transaction'));
    app.use('/api/exchange', require('./api/exchange_transaction'));
    app.use('/api/search', require('./api/search_part_history'));
    app.use('/api/db/search/part', require('./api/search_part_from_db'));
    app.use('/api/db/search/part_history', require('./api/search_part_history_from_db'));

    app.use('/', express.static(path.join(config.root, 'client', 'build')));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    // app.route('/')
    //     .get(function (req, res) {
    //         res.sendfile(app.get('appPath') + '/app/index.html');
    //     });
    // app.route('/*')
    //     .get(errors[404]);
};
