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
  };