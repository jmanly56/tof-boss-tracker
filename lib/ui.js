/**
 * @module ui
 * Module for functions used in creating the menus and buttons.
 */

const {BossInfo} = require('../exports/constants');

function isBoss(input) {
    return input in Object.keys(BossInfo);
}

function createChannelOptions(boss) {
    let x = [];
    for (let i = 0; i < BossInfo[boss].numChannels; i++) {
        x.push({label: `${i + 1}`, value: `${i + 1}`});
    }
    return x;
}

module.exports = {
    isBoss,
    createChannelOptions,
};
