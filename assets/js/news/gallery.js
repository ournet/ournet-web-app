
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
        if (item.type === 'image') {
            items.push({
                type: 'image',
                src: item.url,
                srcset: item.url + ' 1200w, ' + item.url.replace(/\/master\//, '/large/') + ' 640w',
                opts: {
                    thumb: item.url.replace(/\/master\//, '/small/'),
                },
            });
        } else if (item.type === 'video') {
            items.push({
                type: 'iframe',
                src: item.url,
                opts: {
                    autoSize: false,
                    thumb: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0NjEuMDAxIDQ2MS4wMDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ2MS4wMDEgNDYxLjAwMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiNGNjFDMEQ7IiBkPSJNMzY1LjI1Nyw2Ny4zOTNIOTUuNzQ0QzQyLjg2Niw2Ny4zOTMsMCwxMTAuMjU5LDAsMTYzLjEzN3YxMzQuNzI4ICBjMCw1Mi44NzgsNDIuODY2LDk1Ljc0NCw5NS43NDQsOTUuNzQ0aDI2OS41MTNjNTIuODc4LDAsOTUuNzQ0LTQyLjg2Niw5NS43NDQtOTUuNzQ0VjE2My4xMzcgIEM0NjEuMDAxLDExMC4yNTksNDE4LjEzNSw2Ny4zOTMsMzY1LjI1Nyw2Ny4zOTN6IE0zMDAuNTA2LDIzNy4wNTZsLTEyNi4wNiw2MC4xMjNjLTMuMzU5LDEuNjAyLTcuMjM5LTAuODQ3LTcuMjM5LTQuNTY4VjE2OC42MDcgIGMwLTMuNzc0LDMuOTgyLTYuMjIsNy4zNDgtNC41MTRsMTI2LjA2LDYzLjg4MUMzMDQuMzYzLDIyOS44NzMsMzA0LjI5OCwyMzUuMjQ4LDMwMC41MDYsMjM3LjA1NnoiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==',
                },
            })
        }
    }

    return items;
}

function initGallery() {
    $('.js-media-dialog').on('click', function (event) {
        event.preventDefault();
        var el = $(this);
        var items = getGalleryItems(el);
        var options = {
            thumbs: items.length > 1 ? {
                autoStart: true,
                // axis: 'x',
            } : undefined,
            mobile: {
                thumbs: false
            },
            buttons: [
                "zoom",
                // "share",
                // "slideShow",
                //"fullScreen",
                //"download",
                "thumbs",
                "close"
            ]
        };
        $.fancybox.open(items, options);

        ga('send', 'event', 'news-gallery', 'open-media-dialog');
    })
}

initGallery();
