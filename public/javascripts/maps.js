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

      const input = document.getElementById('places')

      if (input) {
        var searchBox = new google.maps.places.SearchBox(input);

        searchBox.addListener('places_changed', () => {
          var places = searchBox.getPlaces();
      
          if (places.length == 0) {
            return;
          }
          this.googleMap.setCenter(places[0].geometry.location),
          this.googleMap.setZoom(18)
        })
      }
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






   