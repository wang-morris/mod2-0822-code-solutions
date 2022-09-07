var userList = document.querySelector('#user-list');

function getUserData(user) {
  var users = new XMLHttpRequest();
  users.open('GET', 'https://jsonplaceholder.typicode.com/users');
  users.responseType = 'json';
  users.addEventListener('load', function () {
    console.log(users.status);
    console.log('response', users.response);
    for (var i = 0; i < users.response.length; i++) {
      var currentUser = users.response[i];
      var $listEntry = document.createElement('li');
      $listEntry.textContent = currentUser.name;
      userList.append($listEntry);
    }
  });
  users.send();
}

getUserData();
