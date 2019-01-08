var quakes_endpoint = "/events";
var mapTitles;
var minimumMag = 0;

$(document).ready(function() {
  $.ajax({
    url: quakes_endpoint,
    method: 'GET',
    success: mapSuccess,
    error: mapError
  });

  $("#find").submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: quakes_endpoint,
      method: 'GET',
      success: remap,
      error: mapError
    });
  });

  // Sort by magnitude
  function sortEvents(response) {
     var sorted = response.sort(function(a, b) {
       return (a.mag > b.mag) ? -1 : ((b.mag > a.mag) ? 1 : 0)
     });

     return sorted;
  }

  function initMap(response, minimumMag) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 2
    });
    for(let i = 0; i < response.length; i++){
      minimumMag = $(".mag").val();
      var magnitude = response[i].mag;
      if(magnitude >= minimumMag) {
        var latLng = new google.maps.LatLng(response[i].lat,response[i].lon);
        var image = {
          url: './images/earthquake.png',
          size: new google.maps.Size(20, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32),
          scaledSize: new google.maps.Size(25, 25)
        };
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          icon: image,
        });
      };
    };
  };

  function mapSuccess(response) {
    console.log(response.length);
    response = sortEvents(response);
    for(let i = 0; i < response.length; i++){
      mapTitles = response[i].address
      id = response[i].id
      var magnitude = parseFloat(response[i].mag).toFixed(2);
      $('#info').append(`<p id=${id}> (${magnitude}) ${mapTitles} </p>`)
    };
    initMap(response, minimumMag);
    console.log(response);
  };

  function mapError(error1, error2, error3) {
    console.log(error1);
    console.log(error2);
    console.log(error3);
  };

  function remap(response) {
    response = sortEvents(response);
    $("#info").empty();
    minimumMag = $(".mag").val();
    for(let i = 0; i < response.length; i++){
      mapTitles = response[i].address
      id = response[i].id
      var magnitude = parseFloat(response[i].mag).toFixed(2);
      if(magnitude >= minimumMag) {
        $('#info').append(`<p id=${id}> (${magnitude}) ${mapTitles} </p>`)
      };
    };
    initMap(response, minimumMag);
    console.log(response);
  }
});