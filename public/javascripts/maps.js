window.onload = () => {
    const eventOne = {
        lat: 40.4167754,
        lng: -3.7037902
    };

    const markers = []

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: eventOne
    });

    let center = {
        lat: undefined,
        lng: undefined
    };

    if (places) {
        places.forEach(function (place) {
            const center = {
                lat: place.location.coordinates[1],
                lng: place.location.coordinates[0]
            };
            const pin = new google.maps.Marker({
                position: center,
                map: map,
                title: place.name
            });
            markers.push(pin);
        });
    }
   
};


// class MyMap {
//     constructor(container) {
//       this.container = container;
//       this.googleMap = null;
//       this.markers = [];
//     }
   
//     init() {
//       this.googleMap = new google.maps.Map(this.container, {
//         zoom: 10,
//         center: { lat: 41.3977381, lng: 2.190471916 }
//       });
//     }
   
//     addMarker(lat, lng) {
//       const marker = new google.maps.Marker({
//         position: { lat, lng },
//         map: this.googleMap
//       });
   
//       this.markers.push(marker);
//     }
   
//     clearMarkers() {
//       this.markers.forEach(m => m.setMap(null));
//       this.markers = [];
//     }
   
//     onClick(cb) {
//       this.googleMap.addListener('click', cb);
//     }
//    }



   