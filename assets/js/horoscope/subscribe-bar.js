var OneSignal = window.OneSignal = window.OneSignal || [];
var $ = require('cash-dom');
var ga = require('../base/ga').ga;

function init() {
    var signId = $('.c-subscribe-bar').data('sign-id');
    if (!signId) {
        return;
    }

    var currentTags;
    var category = 'notifications-horo';

    function initNotifications(permission) {
        function subscribedToCurrentSign() {
            return currentTags && currentTags['zodiac-sign'] == signId;
        }

        function setTags() {
            OneSignal.sendTags({ 'zodiac-sign': signId });
        }

        function subscribeToNotifications() {
            OneSignal.registerForPushNotifications();
            ga('send', 'event', category, 'show-register-native');
        }

        function hideSubscribe() {
            // $('.c-subscribe-bar').addClass('hidden');
        }
        function showSubscribe() {
            // $('.c-subscribe-bar').removeClass('hidden');
        }

        if (permission === 'granted') {
            OneSignal.getTags(function (tags) {
                currentTags = tags;
                if (!subscribedToCurrentSign()) {
                    showSubscribe();
                }
            });
        } else {
            showSubscribe();
            setTimeout(subscribeToNotifications, 1000 * 5);
        }

        OneSignal.on('notificationPermissionChange', function (permissionChange) {
            var currentPermission = permissionChange.to;
            if (currentPermission === 'granted') {
                setTags();
            }
            ga('send', 'event', category, currentPermission);
        });
        // Occurs when the user's subscription changes to a new value.
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            if (isSubscribed) {
                hideSubscribe();
                setTags();
            } else {
                showSubscribe();
            }
        });
    }


    OneSignal.push(function () {
        /* These examples are all valid */
        var isPushSupported = OneSignal.isPushNotificationsSupported();
        if (isPushSupported) {
            OneSignal.push(["getNotificationPermission", function (permission) {
                initNotifications(permission);
            }]);
        } else {
            hideSubscribe();
        }
    });
}

init();
