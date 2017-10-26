var ClientOAuth2 = require('client-oauth2')
var Api = require('./lib/api')

class Freee {
    constructor(option, request = null) {
        this.oauth = new ClientOAuth2({
            clientId: option.clientId,
            clientSecret: option.clientSecret,
            accessTokenUri: `https://api.freee.co.jp/oauth/token`,
            authorizationUri: 'https:///secure.freee.co.jp/oauth/authorize',
            redirectUri: option.redirectUri
        }, request);
        this.token = null;
        this.api = null;
    }

    getUri() {
        return this.oauth.code.getUri();
    }

    setToken(access_token, refresh_token) {
        this.token = this.oauth.createToken(access_token, refresh_token, 'bearer');
        this.api = new Api(this.token);
    }

    getToken(originalUrl) {
        var self = this
        return this.oauth.code.getToken(originalUrl).then(function(token) {
            self.token = token
            self.api = new Api(self.token)
            return token
        });
    }
}

module.exports = Freee