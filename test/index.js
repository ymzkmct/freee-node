var assert = require('assert');

var Freee = require('../index');

var requestMock = function(method, url, body, headers) {
    return new Promise(function(resolve, reject) {
        resolve({
            method: method,
            url: url,
            body: body,
            headers: headers
        })
    })
}
var freee = new Freee({
    clientId: 'client_id',
    clientSecret: 'client_secret',
    redirectUri: 'callback_uri'
}, requestMock);

describe('Freee', function() {
    describe('#oauth', function() {
        it('should return url for getting authorization code', function() {
            assert.equal(freee.getUri(), 'https:///secure.freee.co.jp/oauth/authorize?client_id=client_id&redirect_uri=callback_uri&scope=&response_type=code&state=');
        });
        it('should set right value on createToken', function() {
            freee.setToken('access_token', 'refresh_token', 'bearer');
            var original = freee.oauth.createToken('access_token', 'refresh_token', 'bearer')
            assert.equal(original.accessToken, freee.token.accessToken)
            assert.equal(original.refreshToken, freee.token.refreshToken)
            assert.equal(original.tokenType, freee.token.tokenType)
        });
    })
    describe('#api', function() {
        freee.setToken('access_token', 'refresh_token', 'bearer');

        it ('should set right value when .get', function() {
            return freee.api.get('/api/1/account_items', {company_id: 1}).then(function(mock){
                assert.equal(mock.method, 'GET')
                assert.equal(mock.url, 'https://api.freee.co.jp/api/1/account_items?company_id=1')
                assert.equal(mock.headers.Authorization, 'Bearer access_token')
            })
        })
        it ('should set right value when .post', function() {
            var params = {
                company_id: 1,
                name: '追加品目',
                shortcut1: 'hnmk',
                shortcut2: 'hinmoku'
            }
            return freee.api.post('/api/1/items', params).then(function(mock){
                assert.equal(mock.method, 'POST')
                assert.equal(mock.url, 'https://api.freee.co.jp/api/1/items')
                assert.equal(mock.body, params)
                assert.equal(mock.headers.Authorization, 'Bearer access_token')
            })
        })
    })
});