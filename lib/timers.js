const {BossInfo} = require('../exports/constants');

function generateLine(channel, time = undefined) {
    return `Ch ${channel} Last Kill: ${time}`;
}

function createMessage() {
    //TODO: Create a message to edit in.
}