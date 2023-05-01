const {BossInfo} = require('../exports/constants');
const {Database} = require('./database');

var timers = undefined;

/**
 * Load the timers from file.
 * @param {boolean} force Force the timers to be reset.
 */
function loadTimers(force = false) {
    if (typeof timers === 'undefined' || force === true) {
        timers = new Database('timers');
        if (Object.keys(timers.data).length === 0) {
            Object.keys(BossInfo).forEach((x) => {
                timers.setValue(x, {
                    Timers: new Array(BossInfo[x].numChannels),
                });
            });
            timers.save();
        }
    }
}

/**
 * Sets the time of a specific boss channel.
 * @param {string} boss The boss to update.
 * @param {number} channel The channel of the boss to update.
 * @param {uint} time A UTC epoch to set.
 */
function setTime(boss, channel, time) {
    let x = timers.data;
    x[boss]['Timers'][channel - 1] = time;
    timers.data = x;
}

/**
 * Gets the last kill time of a boss.
 * @param {string} boss The boss to retrieve.
 * @param {number} channel The channel of the boss.
 * @returns The UTC epoch for the boss channel.
 */
function getTime(boss, channel) {
    return timers.data[boss]['Timers'][channel - 1];
}

/**
 * Creates a message to be posted for the given boss.
 * @param {string} boss
 * @returns A string to be posted in the thread for the boss.
 */
function createMessage(boss) {
    let x = timers.data[boss]['Timers'].map((cur, i) => {
        return `Channel: ${i + 1}${i < 9 ? '  ' : ' '}Last Kill: ${
            cur != null ? new Date(cur) : 'None'
        }\n`;
    });
    return x.join('');
}

module.exports = {
    loadTimers,
    setTime,
    getTime,
    createMessage,
};
