var ClientOAuth2 = require('client-oauth2')
var Api = require('./api')

class Freee {
    constructor(option) {
        this.client = new ClientOAuth2({
            clientId: option.clientId,
            clientSecret: option.clientSecret,
            accessTokenUri: `https://api.freee.co.jp/oauth/token`,
            authorizationUri: 'https:///secure.freee.co.jp/oauth/authorize',
            redirectUri: option.redirectUri
        });
        this.token = null;
        this.api = null;
    }

    getUri() {
        return this.client.code.getUri();
    }

    setToken(access_token, refresh_token) {
        this.token = this.client.createToken(access_token, refresh_token, 'bearer');
        this.api = new Api(this.token);
    }

    getToken(originalUrl) {
        var self = this
        return this.client.code.getToken(originalUrl).then(function(token) {
            self.token = token
            self.api = new Api(self.token)
            return token
        });
    }
}

module.exports = Freee