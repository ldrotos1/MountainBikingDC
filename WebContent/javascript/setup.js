/**
 * Louis Drotos
 * Sept 12, 2015
 * 
 * This module provides code that is used to setup the
 * application once the document has been loaded
 */

$( window ).load(function() {
	
	// Creates the map
	objGlobalVars.objMap = nsMap.createMap("map");
	
	// Gets the data from the data from the database and adds it to the map
	objGlobalVars.objDbRef = new Firebase('https://radiant-torch-5066.firebaseio.com/trails');

	objGlobalVars.objDbRef.once("value", function(data) {
		
		$.each(data.val(), function( index, value ) {
			
			// Creates the marker and adds it to the map
			L.marker(new L.latLng(value.lat, value.lon), {
				title: value.name,
				icon: L.icon({
					iconUrl: 'styles/images/biking_icon_org.png',
				    iconSize: [30, 30],
				    iconAnchor: [15, 15]
				})
			}).addTo(objGlobalVars.objMap);
		});
	});
});
	
	
	
	