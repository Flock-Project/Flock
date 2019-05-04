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
    axios.get('/events')
      .then(response => {
        response.data.forEach(coordinate => {
          myMap.addMarker(
            coordinate.coordinates[1],
            coordinate.coordinates[0]
          )
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