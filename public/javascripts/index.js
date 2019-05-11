function onClickJoinEvent(e) {
  // e.preventDefault();

  const eventId = e.target.dataset.eventId;
 
  e.target.innerText = "  Loading"
 
 }

function initMap() {
  const mapContainer = document.getElementById('map')
    
  if (!mapContainer) return;

  const myMap = new MyMap(mapContainer)
 
  myMap.init()
    
  if (document.getElementById('create')) {
    setFormMapListeners(myMap)
  } else if (document.getElementById('events')) {
    addUsersToMap(myMap)
  }

}
   
function addUsersToMap(myMap) {
  axios.get('/events/coordinates' + location.search)
    .then(response => {
      let coordinates = response.data

      if (document.getElementById("event-page")) {
        const id = document.getElementById("event-page").dataset.id;

        coordinates = coordinates.filter(c => c.eventId === id)
      }
console.log('IN')
      coordinates.forEach(coordinate => {
        myMap.addMarker(
          coordinate.coordinates[1],
          coordinate.coordinates[0]
        )

        myMap.googleMap.setCenter({
          lat: coordinate.coordinates[1],
          lng: coordinate.coordinates[0]
        })
      })
    })
    .catch(console.log)
}
   


function setFormMapListeners(myMap) {
  myMap.onClick((event) => {
    const { lat, lng } = event.latLng.toJSON()
 
    myMap.clearMarkers()
    myMap.addMarker(lat, lng)
 
    document.getElementById('lat').value = lat.toFixed(3)
    document.getElementById('lng').value = lng.toFixed(3)
  })
}


window.onload = ()=> {
  initMap()
}