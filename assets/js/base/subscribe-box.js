var OneSignal = window.OneSignal = window.OneSignal || [];
var $ = require('cash-dom');
var ga = require('./ga').ga;

function init() {
    var box = $('.js-subscribe-box');
    if (!box) {
        console.log('no box')
        return;
    }
    var tags = box.data('tags');
    var category = box.data('category');
    var subscribeType = box.data('type');
    if (!tags || !category) {
        console.log('no tags or category')
        return;
    }

    function sameTags(remoteTags) {
        if (!remoteTags) {
            return false;
        }
        for (var prop in tags) {
            if (tags[prop] !== remoteTags[prop]) {
                return false;
            }
        }

        return true;
    }

    function sendTags() {
        OneSignal.sendTags(tags);
    }

    function subscribeToNotifications() {
        OneSignal.registerForPushNotifications();
        ga('send', 'event', category, 'show-register-native');
    }

    function hideSubscribe() {
        box.addClass('u-hidden');
    }
    function showSubscribe() {
        box.removeClass('u-hidden');
    }

    function initNotifications(permission) {
        if (permission === 'granted') {
            OneSignal.getTags(function (remoteTags) {
                if (!sameTags(remoteTags)) {
                    console.log('not same tags', remoteTags)
                    showSubscribe();
                }
            });
        } else {
            showSubscribe();
            if (permission === 'default' && subscribeType === 'force') {
                setTimeout(subscribeToNotifications, 1000 * 2);
            }
        }

        box.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            ga('send', 'event', category, 'click-subscribe-btn');
            if (permission === 'granted') {
                sendTags();
                ga('send', 'event', category, 'updated-tags', JSON.stringify(tags));
                hideSubscribe();
            } else {
                subscribeToNotifications();
            }
        });

        OneSignal.on('notificationPermissionChange', function (permissionChange) {
            var currentPermission = permissionChange.to;
            if (currentPermission === 'granted') {
                sendTags();
            }
            ga('send', 'event', category, currentPermission);
        });
        // Occurs when the user's subscription changes to a new value.
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            if (isSubscribed) {
                hideSubscribe();
                sendTags();
            } else {
                showSubscribe();
            }
        });

    }

    OneSignal.push(function () {
        /* These examples are all valid */
        var isPushSupported = OneSignal.isPushNotificationsSupported();
        if (isPushSupported) {
            console.log('supported')
            OneSignal.push(["getNotificationPermission", function (permission) {
                console.log('permission', permission)
                initNotifications(permission);
            }]);
        } else {
            console.log('not supported')
            hideSubscribe();
        }
    });
}

setTimeout(init, 1000 * 2);
