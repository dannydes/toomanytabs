let tabs = require( 'sdk/tabs' );
let notifications = require( 'sdk/notifications' );

let notified = false;

function notify(count) {
    if ( !notified && count >= 100 ) {
        notifications.notify({
            title: 'Too many tabs :(',
            text: 'Go ahead and close some!'
        });
        notified = true;
    }
}

exports.main = function () {
    let count = 0;
    for each (let tab in tabs) {
        count++;
    }
    notify(count);
    tabs.on( 'open', function () {
        count++;
        notify( count );
    });
    tabs.on( 'close', function () {
        count--;
    });
};