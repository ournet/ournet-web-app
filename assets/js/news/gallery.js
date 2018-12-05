
var $ = global.jQuery = require('jquery');
require('@fancyapps/fancybox/dist/jquery.fancybox');
var ga = require('../base/ga').ga;

function getGalleryItems(el) {
    var model = JSON.parse(el.attr('data-gallery'));
    var list = model.items;
    if (model.startId) {
        var index = 0;
        var found = false;
        for (; index < list.length; index++) {
            if (list[index].id === model.startId) {
                found = true;
                break;
            }
        }

        if (found && index > 0) {
            var item = list[index];
            list.splice(index, 1);
            list.unshift(item);
        }
    }

    var items = []
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        items.push({
            src: item.url,
            srcset: item.url + ' 1200w, ' + item.url.replace(/\/master\//, '/large/') + ' 640w',
        });
    }

    return items;
}

function initGallery() {
    $('.js-media-dialog').on('click', function (event) {
        event.preventDefault();
        var el = $(this);
        var items = getGalleryItems(el);
        $.fancybox.open(items);

        ga('send', 'event', 'news-gallery', 'open-media-dialog');
    })
}

initGallery();
