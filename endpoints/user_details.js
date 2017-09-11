var cric_api_helper = require('../helper/github_api_helper.js');
var joi = require('joi');

module.exports = function (server, options) {
    var joiUsername = joi.string().required().description('User Name: github username or email id.');
    var joiPassword = joi.string().required().description('Password: github account password.');
    
    server.route({
        method: 'GET',
        path: '/users',
        config: {
            validate: {
                params: {
                    username: joiUsername
                },
                headers: {
                },
                query: {
                    password: joiPassword
                        // PUT MORE VALIDATION HERE
                },
                failAction: function (request, reply, source, error) {
                    return reply;
                    // if(error){
                    //     return Promise.reject(error);
                    // }else{
                    //     return Promise.resolve(reply);                    
                    // }
                }
            },
            notes: ['Retrieves a profile for a user based on the Github login credentials.'].join('<br>'),
            tags: ['api', 'github'],
            description: 'Get Users'
        },
        handler: function (request, reply) {
            var options = {
                call_type: 'cricket'
            }
            return cric_api_helper.cricAPICall(options).then(function (return_data) {
                return reply({
                    statusCode: 200,
                    message: 'Live cricket score',
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