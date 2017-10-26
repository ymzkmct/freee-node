Querystring = require('querystring')

class Api {
    constructor(token) {
        this.token = token
    }
    _request(option) {
        return this.token.client.request(option.method, 'https://api.freee.co.jp' + option.url, option.body, option.headers)
    }
    get(path, params) {
        var option = this.token.sign({
            method: 'GET',
            url: path + '?' + Querystring.stringify(params || {})
        })
        return this._request(option)
    }
    post(path, params) {
        var option = this.token.sign({
            method: 'POST',
            url: path,
            body: params || {}
        })
        return this._request(option)
    }
}

module.exports = Api