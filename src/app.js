let users = [];
let $userList = document.querySelector(".user-list");

fetch("http://choniawko.com/api/users-create")
    .then((res) => res.json()
        .then((body) => {
            users = body;
            createList(users);
        })
    );


function createList(users) {
    let listItems = users.map(x => `    <li>${x.name}</li>`).join('');
    let list = `<ul> ${listItems} </ul>`;
    $userList.innerHTML = list;
}




function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 3
    });
}