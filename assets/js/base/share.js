
var $ = require('cash-dom');
var Sharer = require('./sharer').Sharer;

$(function () {
    $('.c-share').each(function (_index, element) {
        var el = $(element);
        var services = el.data('services').split(/,/g);
        var url = el.data('url');
        var title = el.data('title');
        for (var i = 0; i < services.length; i++) {
            var service = correctService(services[i]);
            var item = document.createElement('div');
            item.setAttribute('role', 'button');
            item.className = 'c-share__item v--' + service;
            item.setAttribute('data-url', url);
            item.setAttribute('data-sharer', service);
            title && item.setAttribute('data-title', title);

            var icon = document.createElement('span');
            icon.className = 'c-share__icon';
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><use href="#svg-share-' + service + '"></use></svg>';
            item.appendChild(icon);

            el.append(item);
        }
    })
    Sharer.init();
})

function correctService(service) {
    switch (service) {
        case 'odnoklassniki': return 'okru';
    }

    return service;
}
