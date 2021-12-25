console.log('before');

//当调用较多时，callback 地狱
// getUser(1, (user) => {
//     getRespositories(user.gitHubName, (repos) => {
//          console.log(repos));
//      }
// })

//使用 Promises 实现异步编程
getUser(1)
    .then(user => getRespositories(user.gitHubName))
    .then(repos => console.log(repos))
    .catch(err => console.log("Error:", err.message));


// Async and Await
async function displayRepos() {
    try {
        const user = await getUser(1);
        const repos = await getRespositories(user.gitHubName);
        console.log(repos);
    } catch (err) {
        console.log('Error:', err.message);
    }
}
displayRepos();

console.log('after');



function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log('get user from database');
        resolve({id : id, gitHubName : 'kevin'});
    }, 2000);
    });
}

function getRespositories(user) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            let repos = ['respos1', 'respos2'];
            resolve(`${user} 的仓库 : ${repos} `);
        }, 2000);
    });
}