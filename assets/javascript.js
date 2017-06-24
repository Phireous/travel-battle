// firebase API
var config = {
  apiKey: "AIzaSyDIH85MN0jKXGWOhE6mrnEBt_thrDTLK18",
  authDomain: "project1-1497117467260.firebaseapp.com",
  databaseURL: "https://project1-1497117467260.firebaseio.com",
  projectId: "project1-1497117467260",
  storageBucket: "project1-1497117467260.appspot.com",
  messagingSenderId: "551409501538"
};

firebase.initializeApp(config);

var database = firebase.database();
var location1 
var location2

// 'vs' button submit
$(".btn").on("click", function() {
  event.preventDefault();
  location1 = $("#location1").val();
  console.log($('#location1').val());
  location2 = $('#location2').val();
  console.log($('#location2').val());
  $('.panel-title1').text(location1);
  $('.panel-title2').text(location2);

//WEATHER=======================================================================================

  var APIKey = "9b3663446b3b5048fe340fdc2f081a01";

  var queryWeatherURL1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + location1 + '&appid=' + APIKey;
  var queryWeatherURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + location2 + '&appid=' + APIKey;

   
  $.ajax({
    url: queryWeatherURL1,
    method: "GET"
    })

    .done(function(response) {
      // creating variable for input from location forms
      var input1 = document.getElementById('#location1');
      var input2 = document.getElementById('#location2');
      console.log(queryWeatherURL1);
      console.log(response);

      // converting from kelvin to fahrenheit for weather
      function convert(k){
          var Fahrenheit = (k - 273.15) * 1.80 + 32;
          return Fahrenheit;
        }
     // HTML divs aren't needed, you can write it all in jquery
     // putting data into 'weather1' div from JSON
      $('#weather1').html('<h3>' + location1 + '</h3>' + '<br><p>Wind Speed: ' + response.list[0].wind.speed + "<br> Humidity: " + response.list[0].main.humidity + '<br> Temperature: ' + convert(response.list[0].main.temp).toFixed(2) + "<br> Description: " + response.list[0].weather[0].description + '</p>');

      console.log("Wind Speed: " + response.list[0].wind.speed);
      console.log("Humidity: " + response.list[0].main.humidity);
      console.log("Temperature (F): " + response.list[0].main.temp);
    
  });

  $.ajax({
    url: queryWeatherURL2,
    method: "GET"
    })

    .done(function(response) {
      // creating variable for input from location forms
      var input1 = document.getElementById('#location1');
      var input2 = document.getElementById('#location2');
      console.log(queryWeatherURL2);
      console.log(response);

      // converting from kelvin to fahrenheit for weather
      function convert(k){
          var Fahrenheit = (k - 273.15) * 1.80 + 32;
          return Fahrenheit;
        }

        // HTML divs aren't needed, you can write it all in jquery
        // putting data into 'weather2' div from JSON
        $('#weather2').html('<h3>' + location2 + '</h3>' + '<br><p> Wind Speed: ' + response.list[0].wind.speed + "<br> Humidity: " + response.list[0].main.humidity + '<br> Temperature: ' + convert(response.list[0].main.temp).toFixed(2) + "<br> Description: " + response.list[0].weather[0].description + '</p>');
    

      console.log("Wind Speed: " + response.list[0].wind.speed);
      console.log("Humidity: " + response.list[0].main.humidity);
      console.log("Temperature (F): " + response.list[0].main.temp);
    
  });

//ABOUT=============================================================================================    

  var queryAboutURL1 = "https://api.geonames.org/wikipediaSearchJSON?q=" + location1 + "&username=lsussan";
  var queryAboutURL2 = "https://api.geonames.org/wikipediaSearchJSON?q=" + location2 + "&username=lsussan";


  $.ajax({
    url: queryAboutURL1,
    method: "GET"
    })

    .done(function(response) {
      // creating variable for input from location forms
      var input1 = document.getElementById('#location1');
      var input2 = document.getElementById('#location2');
      console.log(queryAboutURL1);
      console.log(response);

      // HTML divs aren't needed, you can write it all in jquery
      // putting data into 'weather2' div from JSON
      $('#about1').html('<h3>' + location1 + '</h3>' + '<br><p> Summary: ' + response.geonames[0].summary + '<br><br> Go to: ' + "<a href='https://" + response.geonames[0].wikipediaUrl +  "'target='blank1'> Wikipedia</a>" + '</p>');
    
    });


    $.ajax({
    url: queryAboutURL2,
    method: "GET"
    })

    .done(function(response) {
      // creating variable for input from location forms
      var input1 = document.getElementById('#location1');
      var input2 = document.getElementById('#location2');
      console.log(queryAboutURL2);
      console.log(response);

      // HTML divs aren't needed, you can write it all in jquery
      // putting data into 'weather2' div from JSON
      $('#about2').html('<h3>' + location2 + '</h3>' + '<br><p> Summary: ' + response.geonames[0].summary + '<br><br> Go to: ' + "<a href='https://" + response.geonames[0].wikipediaUrl +  "'target='blank2'> Wikipedia</a>" + '</p>');
    
    });


});

//MAP========================================================================================

function initAutocomplete() {
  // creating variable for map1 to pull data from google map and put it in 'map1' div
  var map1 = new google.maps.Map(document.getElementById('map1'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });
  // creating variable for map1 to pull data from google map and put it in 'map2' div
  var map2 = new google.maps.Map(document.getElementById('map2'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input1 = document.getElementById("location1");
  var searchBox1 = new google.maps.places.SearchBox(input1);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var input2 = document.getElementById("location2");
  var searchBox2 = new google.maps.places.SearchBox(input2);

  // Bias the SearchBox results towards current map's viewport.
  map1.addListener('bounds_changed', function() {
    searchBox1.setBounds(map1.getBounds());
  });

  map2.addListener('bounds_changed', function() {
    searchBox2.setBounds(map2.getBounds());
  });

  var markers1 = [];
  var markers2 = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox1.addListener('places_changed', function() {
    var places = searchBox1.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers1.forEach(function(marker) {
      marker.setMap(null);
    });
    markers1 = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers1.push(new google.maps.Marker({
        map: map1,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map1.fitBounds(bounds);


//PLACES1==================================================================================
  var request = {
      location: bounds.getCenter(),
      radius: "5000",
      types: ["museum", "amusement_park", "art_gallery", "university", "zoo"]
  };

  var container = document.getElementById("places1");

  var service = new google.maps.places.PlacesService(container);
      service.nearbySearch(request, callback);

  function callback(results, status) {

      if (status == google.maps.places.PlacesServiceStatus.OK) {

          for (var i = 0; i < results.length; i++) {

              container.innerHTML += results[i].name + "<br/>";

          }
      }
    }
  });

//END OF PLACES1===========================================================================

  searchBox2.addListener('places_changed', function() {
    var places = searchBox2.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers2.forEach(function(marker) {
      marker.setMap(null);
    });
    markers2 = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers2.push(new google.maps.Marker({
        map: map2,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map2.fitBounds(bounds);

//PLACES2=====================================================================================

var request = {
            location: bounds.getCenter(),
            radius: "5000",
            types: ["museum", "amusement_park", "art_gallery", "university", "zoo"]
        };

        var container = document.getElementById("places2");

        var service = new google.maps.places.PlacesService(container);
        service.nearbySearch(request, callback);

        function callback(results, status) {

            if (status == google.maps.places.PlacesServiceStatus.OK) {

                for (var i = 0; i < results.length; i++) {

                    container.innerHTML += results[i].name + "<br/>";

                }
            }
        }
    });
}


//END OF PLACES2================================================================================



