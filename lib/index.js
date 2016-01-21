var Strategy = require('./strategy'),
    OAuth2Strategy = require('passport-oauth2');

//export the same things as the OAuth2 strategy
exports = module.exports = Strategy;
exports.Strategy = Strategy;

//export errors of the OAuth2 strategy
exports.AuthorizationError = OAuth2Strategy.AuthorizationError;
exports.TokenError = OAuth2Strategy.TokenError;
exports.InternalOAuthError = OAuth2Strategy.InternalOAuthError;
