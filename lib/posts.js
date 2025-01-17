const fs = require('fs');
const {BossInfo} = require('../exports/constants');

var posts = undefined;

/**
 * Load the `posts.json` file or recreate it from scratch if it is not found.
 * The default filepath is ../data/posts.json.
 * @param force Force the program to either re-read or recreate the file. Default false.
 */
function loadPosts(force = false) {
    if (typeof posts === 'undefined' || force === true) {
        try {
            posts = JSON.parse(fs.readFileSync('./data/posts.json'));
            console.log('Test');
        } catch (error) {
            console.log(error);
            posts = {};
            Object.keys(BossInfo).forEach((x) => {
                posts[x] = 0;
            });
            savePosts();
        }
    }
}

/**
 * Set a specific boss key's channel id.
 * @param {String} boss
 * @param {uint} id
 */
function setPostID(boss, id) {
    const exists =
        Object.keys(BossInfo).find((x) => x === boss) === 'undefined';
    if (exists && id > 0) {
        posts[boss] = id;
    } else {
        throw new Error(
            `Could not update id. Is the boss name correct? ${boss}`
        );
    }
}

/**
 * Set all of the ids in the database using a dictionary of k: Boss Name v: ID.
 * @param {Object} ids An object who's keys match those of the @see BossInfo struct.
 */
function setAllIds(ids) {
    try {
        Object.keys(ids).forEach((key) => {
            posts[key] = ids[key];
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * Save the current database to `../data/posts.json`.
 */
function savePosts() {
    fs.writeFileSync(
        './data/posts.json',
        JSON.stringify(posts),
        {flag: 'w'},
        (err) => console.log(err)
    );
}

/**
 * Get a specific channel id for a boss.
 * @param {string} bossName
 * @returns The Channel ID for the boss.
 */
function getID(bossName) {
    if (typeof posts === 'undefined') {
        loadPosts();
    }
    return posts[bossName];
}
// console.log(posts);

module.exports = {
    loadPosts,
    setPostID,
    setAllIds,
    savePosts,
    getID,
};
