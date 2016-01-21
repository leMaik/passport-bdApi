var util = require('util'),
    request = require('request'),
    OAuth2Strategy = require('passport-oauth2').Strategy;

var BdApiStrategy = function(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = undefined;
  }
  options = options || {};
  options.authorizationURL || (options.authorizationURL = options.apiURL + '/oauth/authorize');
  options.tokenURL || (options.tokenURL = options.apiURL + '/oauth/token');

  var self = this;
  OAuth2Strategy.call(this, options, function (accessToken, refreshToken, profile, done) {
    //bdApi doesn't directly expose the profile, so we need to fetch it manually
    request(options.apiURL + "/users/me/?oauth_token=" + accessToken, function(err, response, body) {
      var profile;
      if (err || response.statusCode !== 200) {
        done('Could not get profile', null);
      } else {
        verify(accessToken, refreshToken, JSON.parse(body).user, done);
      }
    });
  });
};

util.inherits(BdApiStrategy, OAuth2Strategy);

module.exports = BdApiStrategy;
