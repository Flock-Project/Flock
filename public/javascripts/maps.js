class MyMap {
    constructor(container) {
      this.container = container;
      this.googleMap = null;
      this.markers = [];
      this.init();
    }
   
    init() {
      this.googleMap = new google.maps.Map(this.container, {
        zoom: 14,
        center: { lat: 40.416775, lng: -3.703790 }
      });
    }
   
    addMarker(lat, lng) {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.googleMap
      });
   
      this.markers.push(marker);
    }
   
    clearMarkers() {
      this.markers.forEach(m => m.setMap(null));
      this.markers = [];
    }
   
    onClick(cb) {
      this.googleMap.addListener('click', cb);
    }
}


window.onload = () => {

    const mapContainer = document.getElementById('map');

    if (mapContainer) {
        const map = new MyMap(mapContainer)
        if (markers) {
            markers.forEach(function (place) {
                map.addMarker(place.location.coordinates[1], place.location.coordinates[0])
            });
        }

        map.onClick(event => {
            const { lat, lng } = event.latLng.toJSON();
            map.clearMarkers()
            map.addMarker(lat, lng)
   
            document.getElementById('lat').value = lat.toFixed(3)
            document.getElementById('lng').value = lng.toFixed(3)
        })
    }
   
};





   