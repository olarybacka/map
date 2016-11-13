const GoogleMapsApiLoader = require('google-maps-api-loader');
let users = [];
let $userList = document.querySelector(".user-list");

// get users 
fetch("http://choniawko.com/api/users-create")
    .then((res) => res.json()
        .then((body) => {
            users = body;
            console.log(users);
            createList(users);
        })
    );

// create user list
let createList = (users) => {
    let ul = document.createElement("ul");
    users.forEach(x => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(x.name));
        ul.appendChild(li);
    });
    $userList.appendChild(ul);
}

// init map api
GoogleMapsApiLoader({
        libraries: ['places'],
        apiKey: 'AIzaSyBddrDs4IAuWIojOax0sQBoW39pRZUsrQw' 
    })
    .then((googleApi) => {
        initMap();
    }, (err) => { 
        console.error(err);
    });    
    
    
// init map
function initMap(){
    
    const myLatlng = new google.maps.LatLng(18, -3);
    const mapOptions = {
        zoom: 2,
        center: myLatlng
    }
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    users.forEach(x => {
        pinMarker(x.name, x.address.geo.lat, x.address.geo.lng, x.avatar);
    })

   function pinMarker(name, lat, lng, avatar){
     
        let pinIcon = new google.maps.MarkerImage(
            avatar,
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(42, 42)
        );  
        let marker = new google.maps.Marker({ 
            position: new google.maps.LatLng(lat, lng),
            map: map,
            icon: pinIcon,
            title: name
        });
    }
}
 