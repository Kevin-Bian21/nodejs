console.log('before');
getUser(1, (user) => {
    getRespositories(user.gitHubName, (repos) => {
        console.log(repos);
    })
})
console.log('after');



function getUser(id, callback) {
    setTimeout(() => {
        console.log('get user from database');
        callback({id : id, gitHubName : 'kevin'});
    })
}

function getRespositories(user, callback) {
    setTimeout( () => {
        let repos = ['respos1', 'respos2'];
        callback(`${user} 的仓库 : ${repos} `);
    }, 2000);
}