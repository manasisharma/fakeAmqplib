'use strict';

let ch = {

    checkQueue: (queue, qCallback) => {

        return qCallback && qCallback();
    },
    assertExchange: (exchange, options, options2, exchCallback) => {

        return exchCallback && exchCallback();
    },
    bindQueue: (queue, exchange, bindCallback) => {

        return bindCallback && bindCallback();
    },
    consume: (queue, func) => {

        return func(msg);
    },
    ack: () => {},
    prefetch: () => {}
};

let conn = {

    createChannel: (channelCallback) => {

        let channel = ch;
        channelCallback(null, channel);
    },
    close: () => {}
};

function connect (url, connCallback) {

    if (url.startsWith('amqp://')) {

        let connection = conn;
        return connCallback(null, connection);

    } else {

        return connCallback(new Error('Invalid URI'), null);
    }
}

let badCh = {

    checkQueue: (queue, qCallback) => {

        return qCallback && qCallback();
    },
    assertExchange: (exchange, options, options2, exchCallback) => {

        return exchCallback && exchCallback();
    },
    bindQueue: (queue, exchange, bindCallback) => {

        return bindCallback && bindCallback();
    },
    consume: (queue, func) => {

        consume: (queue, func) => {

            return func(msg);
        }
    },
    reject: () => {},
    prefetch: () => {}
};

let badConn = {

    createChannel: (channelCallback) => {

        let channel = badCh;
        channelCallback(null, channel);
    },
    close: () => {}
};

function badConnect (url, connCallback) {

    if (url.startsWith('amqp://')) {

        let connection = badConn;
        return connCallback(null, connection);

    } else {

        return connCallback(new Error('Invalid URI'), null);
    }
}


let invalidCh = {

    checkQueue: ch.checkQueue,
    assertExchange: ch.assertExchange,
    bindQueue: ch.bindQueue,
    consume: (queue, func) => {
        return func(invalidMsg);
    },
    nack: () => {},
    prefetch: () => {}
};

let invalidConn = {

    createChannel: (channelCallback) => {

        let channel = invalidCh;
        channelCallback(null, channel);
    },
    close: () => {}
};

function invalidConnect (url, connCallback) {

    let connection = invalidConn;
    return connCallback(null, connection);
}

let errconn = {

    createChannel: (channelCallback) => {

        channelCallback(new Error('Unable to create to channel'),null);
    }
};

function errConnect (url, connCallback) {

    let connection = errconn;
    return connCallback(null, connection);
}

module.exports = {
    connect: connect,
    channel: ch,
    amqpConn: conn,
    invalidConnect: invalidConnect,
    errConnect: errConnect,
    badConnect: badConnect
};
