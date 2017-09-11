'use strict';

exports.register = function (server, options, next) {
    require('../endpoints/user_details.js')(server, options);        
    next();
};

exports.register.attributes = {
    pkg: {
        'name': 'git api',
        'version': '1.0.0',
        'description': 'Endpoints for https://api.github.com/ api',
        'main': 'index.js'
    }
};