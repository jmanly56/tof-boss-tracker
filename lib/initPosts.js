const fs = require('fs');
const {BossInfo} = require('../exports/constants');

var posts;

function loadPosts(force = false) {
    if (posts === 'undefined' || force === true) {
        try {
            posts = JSON.parse(fs.readFileSync('../data/posts.json'));
            console.log('Test');
        } catch (error) {
            console.log(error);
            posts = {};
            Object.keys(BossInfo).forEach((x) => {
                posts[x] = 0;
            });
        }
    }
}

function setPostID(boss, id) {
    if (boss && id > 0) {
        posts[boss] = id;
    }
}

function savePosts() {
    fs.writeFile('../data/posts.json', JSON.stringify(posts), (err) =>
        console.log(err)
    );
}

loadPosts(true);
console.log(posts);
