var map;
var markers = [];




function initMap() {
    var mapCenter = new google.maps.LatLng(54.8985, 23.9036);

    map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        zoom: 6,
        streetViewControl: false,
        disableDefaultUI: true,
    });

    map.addListener('click', function(event) {
        addMarker(event.latLng);
    });
    addMarker(mapCenter);





    /*////////////////////////////////////searchBox///////////////////////////////////////*/



    var card = document.getElementById('address-searchBar');
    var input = document.getElementById('searchBoxx');
    var searchBox = new google.maps.places.SearchBox(input);




    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markerz = [];
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        markerz.forEach(function(marker) {
            marker.setMap(null);
        });
        markerz = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            markerz.push(new google.maps.Marker({
                map: map,
                draggable:true,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            }
            else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
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
        map: map,
        title: "undefined location" + location,
        draggable: true,
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
