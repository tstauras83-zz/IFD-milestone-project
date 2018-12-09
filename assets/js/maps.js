var map;
var markers = [];


function initMap() {
    var mapCenter = new google.maps.LatLng(54.8985, 23.9036);

    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 6
    });

    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });
    
/*/ ///////////////////////////////////searchBox///////////////////////////////////////*/

    addMarker(mapCenter);

    var card = document.getElementById('address-searchBar');
    var input = document.getElementById('searchBoxx');


    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);



    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        }
        else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
    });
}


/*////////////////////////////////////map markers///////////////////////////////////////*/


function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}



function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


function clearMarkers() {
    setMapOnAll(null);
}


function deleteMarkers() {
    clearMarkers();
    markers = [];
    setMapOnAll(null);
}

/*////////////////////////////////////....///////////////////////////////////////*/
