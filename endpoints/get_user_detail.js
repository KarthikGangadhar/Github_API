var github_helper = require('../helper/github_api_helper.js');
var joi = require('joi');

module.exports = function (server, options) {
    var joiUsername = joi.string().required().description('User Name: github username or email id.');
    // var joiPassword = joi.string().required().description('Password: github account password.');
    
    server.route({
        method: 'GET',
        path: '/users/{id}',
        config: {
            validate: {
                query: {
                        // PUT MORE VALIDATION HERE
                        id: joiUsername,
                        // password: joiPassword
                }
            },
            notes: ['Retrieves a profile for a user based on the Github login credentials.'].join('<br>'),
            tags: ['api', 'github'],
            description: 'Get Users'
        },
        handler: function (request, reply) {
            var options = {
                username: request.query.username,
                // password: request.query.password
            }
            return github_helper.githubAPICall(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'user data',
                    data: return_data
                });
            }).catch(function (err) {
                return reject({
                    'error': err.message
                });
            });
        }
    });


}