freee API Client for Node.js
====

[freee](https://www.freee.co.jp/)の公開APIのnode.js用クライアントです。ただし現時点ではAuthorization Code Flowのみに対応しています

## APIドキュメント

freeeのAPIのドキュメントは[こちら](https://secure.freee.co.jp/developers/api/doc)を参照してください

## Install
```
npm install freee-node --save
```

## Usage


```js
var Freee = require('freee-node')
var freee = new Freee({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: CALLBACK_URI
});
```

### access token保存まで

expressを利用したWebサーバで、authorization codeを取得するためにURLにリダイレクトするケースと、access tokenを取得する方法についてのサンプルコードです。oauth2の処理は[js-client-oauth2](https://github.com/mulesoft/js-client-oauth2/)のライブラリに大きく依存しています。

```js
app.get('/freee', function(req, res) {
    //認可コード取得用のURLに遷移する
    res.redirect(freee.getUri())
})
app.get('/freee/callback', function(req, res) {
    //認可コードからアクセストークンを取得する
    freee.getToken(req.originalUrl).then(function(token) {
        // token.accessTokenやtoken.refreshTokenを保存する
    })
})
```

### freee APIを利用する
```js
freee.api.get('/api/1/users/me', {companies: true}).then(function(res) {
    console.log(res)
})
freee.api.get('/api/1/account_items', {company_id: company_id}).then(function(res) {
    console.log(res)
})
freee.api.post('/api/1/items', {
    company_id: company_id,
    name: 'ひんもーく',
    shortcut1: 'hnmk',
    shortcut2: 'hinmoku'
}).then(function(res) {
    console.log(res)
})
```


## Licence

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[ymzkmct](https://github.com/ymzkmct)