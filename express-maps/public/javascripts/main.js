
let initialCoords = { lat: 41.3977381, lng: 2.190471916 }, myMap

function initMap() {
    let mapOptions = { center: initialCoords, zoom: 5 }
    myMap = new google.maps.Map(document.querySelector('#restaurantsMap'), mapOptions)
    getRestaurants()
}


function getRestaurants() {

    axios.get("/restaurants/api")
        .then(response => {
            const allRestaurants = response.data
            console.log('el array de restaurantes es:', allRestaurants)
            placeRestaurantsInMap(allRestaurants)
        })
        .catch(error => console.log(error))
}


function placeRestaurantsInMap(restaurants) {

    restaurants.forEach(restaurant => {
        const center = { lat: restaurant.location.coordinates[1], lng: restaurant.location.coordinates[0] }
        new google.maps.Marker({ position: center, map: myMap, title: restaurant.name })
    })
}