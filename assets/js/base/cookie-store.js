var Cookie = require('js-cookie');

function CookieStore(name, options) {
    if (!name) {
        throw new Error('Invalid cookie name: ' + name);
    }
    if (!options) {
        throw new Error('Invalid cookie options: ' + options);
    }
    if (!options.domain) {
        throw new Error('Invalid cookie domain: ' + options.domain);
    }
    if (!options.expires) {
        throw new Error('Invalid cookie expires: ' + options.expires);
    }
    var path = options.path || '/';
    this._name = name;

    this._options = {
        path: path,
        domain: options.domain,
        expires: options.expires,
    };
}

CookieStore.prototype.get = function () {
    return Cookie.get(this._name);
}

CookieStore.prototype.set = function (value) {
    Cookie.set(this._name, value, this._options);
}

exports.CookieStore = CookieStore;
