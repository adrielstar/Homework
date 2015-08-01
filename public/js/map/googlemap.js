/**
 * Created by adriel on 19-7-15.
 */

var map = null;
var infoWindow = new google.maps.InfoWindow();
var storeInfowindow = new google.maps.InfoWindow();
var stallingeninfowindow = new google.maps.InfoWindow();
var arrayStoreMarkers = [];
var stalingmarkermarkers = [];
var htmls = [];
var to_htmls = [];
// set direction render options
var rendererOptions = { draggable: true };
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
var bikeStoreVisible = true;

var directionDisplay;


var start = getCookie("latitude") + "," + getCookie("longitude");
var appPath;

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function initialize() {

    myLatlng = new google.maps.LatLng(51.924215999999990000, 4.481775999999968000);
    mapOptions = {
        zoom: 13,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('location-to'));
    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input),
        {
            types: ['(cities)']
        //componentRestrictions: countryRestrict
        });


    directionsDisplay.setMap(map);

    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });

    // Markers icons
    bike_location = new google.maps.MarkerImage('images/BikeLocationIcon.png');
    stallingen_ImageIcon = new google.maps.MarkerImage('images/bike.png');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
                setCookie("latitude",position.coords.latitude,1);
                setCookie("longitude",position.coords.longitude,1);

                var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                contentString = 'current location';

                // request to google api to get all bicycle_store
                request = {
                    location: myLatlng,
                    radius: 1000,
                    types: ['bicycle_store']
                };

                service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, callback);


                locationInfowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                var currentLocationMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: bike_location
                });

                google.maps.event.addListener(currentLocationMarker, 'click', function () {
                    locationInfowindow.open(map, currentLocationMarker);
                });

                map.setCenter(pos);
            },
            function () {
                handleNoGeolocation(true);
            });

    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }

    // create Stallingen Markers
    for (k = 0; k < stallingen.length; k++) {

        stallingenLatCoordinat = parseFloat(stallingen[k]["lat"]);
        stallingenLngCoordinat = parseFloat(stallingen[k]["lng"]);
        stallingName = stallingen[k]["name"];
        stallingAdres = stallingen[k]["Adres"];
        stallingPostcode = stallingen[k]["Postcode"];
        stallingPlaats = stallingen[k]["Plaats"];
        stallingCapaciteit = stallingen[k]["Capaciteit"];
        stallingOpeningstijden = stallingen[k]["Openingstijden"];

        stallingOpeningstijdenSplits = stallingOpeningstijden.match(/.{1,17}/g);
        stallingenLatLng = new google.maps.LatLng(parseFloat(stallingenLatCoordinat), parseFloat(stallingenLngCoordinat));
        stallingMarker = new google.maps.Marker({
            position: stallingenLatLng ,
            map: map,
            icon: stallingen_ImageIcon,
            title: stallingName
        });

        // create link to direction
        var html = '<br>Directions: <a href="javascript:tohere(' + k + ')">To here<\/a> ';
        // cre
        var  to_here_Adress = '<h6> Stalling Adres: ' + stallingAdres + '</h6>'
                            + '<h6> Plaats: ' + stallingPlaats + '</h6>';

        var k = stalingmarkermarkers.length;
        latlng = stallingenLatLng;

        // The info window version with the "to here" form open
        to_htmls[k] = to_here_Adress +
        '<form action="javascript:getDirections()">' +
        '<input type="hidden" name="saddr" id="saddr" value="" /><br>' +
        '<INPUT value="Get Directions" TYPE="button" onclick="getDirections()"><br>' +
        'Walk <input type="checkbox" name="walk" id="walk" /> &nbsp; Bike <input type="checkbox" name="bike" id="bike" />' +
        '<input type="hidden" id="daddr" value="' + latlng +
        '"/>';

        stallingenDetails = '<h5>' + stallingName + '</h5>'
        + '<h6> Adres: ' + stallingAdres + '</h6>'
        + '<h6> Postcode: ' + stallingPostcode + '</h6>'
        + '<h6> Plaats: ' + stallingPlaats + '</h6>'
        + '<h6> Capaciteit: ' + stallingCapaciteit + '</h6>'
        + '<h6> Openingstijden:</h6>'
        + '<h6> ' + stallingOpeningstijdenSplits[5] + '</h6>'
        + '<h6> ' + stallingOpeningstijdenSplits[6] + '</h6>'
        + '<h6> ' + stallingOpeningstijdenSplits[7] + '</h6>'
        + '<h6> ' + stallingOpeningstijdenSplits[0] + '</h6>'
        + '<h6>  ' + stallingOpeningstijdenSplits[1] + '</h6>'
        + '<h6>  ' + stallingOpeningstijdenSplits[2] + '</h6>'
        + '<h6> ' + stallingOpeningstijdenSplits[3] + '</h6>'
        + '<h6> ' + stallingOpeningstijdenSplits[4] + '</h6>'
        + html;


        stallingenInfoWindow(stallingMarker, stallingenDetails);
        stalingmarkermarkers.push(stallingMarker);
        htmls[k] = html;
    }
}

// ===== request the directions =====
function getDirections() {

    var start = getCookie("latitude") + "," + getCookie("longitude");


    var request = {};
    if (document.getElementById("walk").checked) {
        request.travelMode = google.maps.DirectionsTravelMode.WALKING;
    } else {
        request.travelMode = google.maps.DirectionsTravelMode.DRIVING;
    }

    if (document.getElementById("bike").checked) {
        request.travelMode = google.maps.DirectionsTravelMode.BICYCLING;
    } else {
        request.travelMode = google.maps.DirectionsTravelMode.DRIVING;
    }
    // ==== set the start and end locations ====
    var saddr = document.getElementById("saddr").value;
    var daddr = document.getElementById("daddr").value;

    request.origin = start , saddr;
    request.destination = daddr;
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            //var leg = response.routes[ 0 ].legs[ 0 ];
            //makeMarker( leg.start_location, icons.start, "title" );
            //makeMarker( leg.end_location, icons.end, 'title' );
        } else alert("Directions not found:" + status);
    });

    // Start/Finish icons
    //var icons = {
    //    start: new google.maps.MarkerImage(
    //        // URL
    //        'images/BikeLocationIcon.png'
    //    ),
    //    end: new google.maps.MarkerImage(
    //        // URL
    //        'images/bike.png'
    //    )
    //};


    //function makeMarker( position, icon, title ) {
    //    new google.maps.Marker({
    //        position: position,
    //        map: map,
    //        icon: icon,
    //        title: title
    //    });
    //}
}


// This function picks up the click and opens the corresponding info window
function myclick(i) {
    google.maps.event.trigger(stalingmarkermarkers[i], "click");
}


// functions that open the directions forms
function tohere(i) {

    infoWindow.setContent(to_htmls[i]);
    infoWindow.open(map, stalingmarkermarkers[i]);
}

/**
 *
 * @param results
 * @param status
 */
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}


/**
 *
 * @param Bike store place
 */
function createMarker(place) {
    var placeLoc = place.geometry.location;
    storeIcon = new google.maps.MarkerImage('images/BikeStoreIcon.png');
    var storeBikeMarker = new google.maps.Marker({
        map: map,
        icon: storeIcon,
        position: place.geometry.location
    });

    arrayStoreMarkers.push(storeBikeMarker);

    var request = {reference: place.reference};
    service.getDetails(request, function (details, status) {
        google.maps.event.addListener(storeBikeMarker, 'click', function () {
            storeInfowindow.setContent("<h5>" + details.name + "</h5>"
            + details.formatted_address + "<br />"
            + "<a  id='demo' href=" + details.website + '" target="_blank">' + details.website + "</a>" +
            "<br />" + details.formatted_phone_number);
            storeInfowindow.open(map, this);
        });
    });
}

/**
 *
 * @param errorFlag
 */
function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    options = {
        map: map,
        position: new google.maps.LatLng(51.924215999999990000, 4.481775999999968000),
        content: content
    };

    infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}


function stallingenInfoWindow(stallingMarker, stallingenDetails) {
    google.maps.event.addListener(stallingMarker, 'click', function () {
        if (!stallingMarker.open) {
            infoWindow.setContent(stallingenDetails);
            infoWindow.open(map, stallingMarker);
            stallingMarker.open = true;
        }
        else {
            infoWindow.close(map, stallingMarker);
            stallingMarker.open = false;
        }
    });
}


/**
 * Hide bike Store
 */
function hideBikestore() {
    if (arrayStoreMarkers) {
        for (var i = 0; i < arrayStoreMarkers.length; i++) {
            arrayStoreMarkers[i].setMap(null);
        }
    }
}
/**
 *  show bike store
 */
function showBikeStore() {
    if (arrayStoreMarkers) {
        for (var i = 0; i < arrayStoreMarkers.length; i++) {
            arrayStoreMarkers[i].setMap(map);
        }
    }
}
function changeBikeStoreVisibility() {
    if(!bikeStoreVisible) {
        showBikeStore();
        document.getElementById("btn").className = " btn btn-sm btn-success glyphicon glyphicon-home";
        bikeStoreVisible = true;
    }
    else  {
        hideBikestore();
        document.getElementById("btn").className = "btn btn-sm btn-danger glyphicon glyphicon-home";
        bikeStoreVisible = false;
    }
}


function setEnd() {
    postcode = document.getElementById("location-to").value;
    $.post("http://maps.googleapis.com/maps/api/geocode/json?address=" + postcode + "+Netherlands",
        function (data) {
            calcRoute(data.results[0]["geometry"]["location"]["lat"] + "," + data.results[0]["geometry"]["location"]["lng"]);
        });
}

function deg2rad(angle) {
    //  discuss at: http://phpjs.org/functions/deg2rad/
    // original by: Enrique Gonzalez
    // improved by: Thomas Grainger (http://graingert.co.uk)
    //   example 1: deg2rad(45);
    //   returns 1: 0.7853981633974483

    return angle * .017453292519943295; // (angle / 180) * Math.PI;
}

function rad2deg(angle) {
    //  discuss at: http://phpjs.org/functions/rad2deg/
    // original by: Enrique Gonzalez
    // improved by: Brett Zamir (http://brett-zamir.me)
    //   example 1: rad2deg(3.141592653589793);
    //   returns 1: 180

    return angle * 57.29577951308232; // angle / Math.PI * 180
}

function getDistance(latitude1, longitude1, latitude2, longitude2) {
    earth_radius = 6371;

    dLat = deg2rad( latitude2 - latitude1 );
    dLon = deg2rad( longitude2 - longitude1 );

    a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    c = 2 * Math.asin(Math.sqrt(a));
    d = earth_radius * c;

    return d * 1000;
}

function calculate_distance(latitude1, longitude1, latitude2, longitude2){
    dist = Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2)) + Math.cos(deg2rad(latitude1)) * Math.cos(deg2rad(latitude2)) * Math.cos(deg2rad(longitude1 - longitude2));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    miles  = dist * 60 * 1.1515;

    return miles * 1609.344;
}

function calcRoute(me) {
    var found = false;
    var waypoints = [];

    var relevantStallingPositions = [];
    var relevantStallingDistance = [];

    for (i = 0; i < stallingen.length; i++) {
        stallingLat = stallingen[i]["lat"];
        stallingLng = stallingen[i]["lng"];

        endArray = me.split(",");
        endLat = endArray[0];
        endLng = endArray[1];

        distance = calculate_distance(endLat, endLng, stallingLat, stallingLng);
        if (distance < 400) {
            waypoint = stallingLat +","+stallingLng;

            relevantStallingDistance.push(distance);
            relevantStallingPositions.push(waypoint);

            console.log("found ------ " + stallingLat +","+stallingLng + " dist: " + distance);
            found = true;
        }
    }

    if (found) {

        var index = 0;
        var value = relevantStallingDistance[0];
        for (var i = 1; i < relevantStallingDistance.length; i++) {
            if (relevantStallingDistance[i] < value) {
                value = relevantStallingDistance[i];
                index = i;
            }
        }

        waypoint = relevantStallingPositions[index];

        waypoints.push({
            location: waypoint,
            stopover: true
        });
        console.log("caling route   " + me);

        var request = {
            origin: start,
            destination: me,
            waypoints: waypoints,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            travelMode: google.maps.DirectionsTravelMode["BICYCLING"]
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
                // alert an error message when the route could nog be calculated.
                if (status == 'ZERO_RESULTS') {
                    alert('No route could be found between the origin and destination.');
                } else if (status == 'UNKNOWN_ERROR') {
                    alert('A directions request could not be processed due to a server error. The request may succeed if you try again.');
                } else if (status == 'REQUEST_DENIED') {
                    alert('This webpage is not allowed to use the directions service.');
                } else if (status == 'OVER_QUERY_LIMIT') {
                    alert('The webpage has gone over the requests limit in too short a period of time.');
                } else if (status == 'NOT_FOUND') {
                    alert('At least one of the origin, destination, or waypoints could not be geocoded.');
                } else if (status == 'INVALID_REQUEST') {
                    alert('The DirectionsRequest provided was invalid.');
                } else {
                    alert("There was an unknown error in your request. Requeststatus: nn" + status);
                }
            }
        });

        appPath = "comgooglemaps://?saddr=" + start + "&daddr=" + waypoint + "&directionsmode=bicycling";
        document.getElementById("gameAnchor").setAttribute("href", appPath);
    } else {
        alert("Helaas geen stalling in de buurt van eind bestemming.");
    }
}

function panelVisibility() {
    directionsDisplay.setPanel(document.getElementById("directionsPanel").style.visibility = "hidden");
}

google.maps.event.addDomListener(window, 'load', initialize);


//var gamePath = "comgooglemaps://?saddr=" + start + "&daddr=" + end + "&directionsmode=bicycling";
