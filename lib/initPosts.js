const fs = require('fs');

var posts;

function loadPosts(force=false) {
    if (posts === 'undefined' || force === true) {
        posts = JSON.parse(fs.readFileSync('../data/posts.json'));
    }
}

function setPostID(boss, id) {

}

function savePosts (){
    
}