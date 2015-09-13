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
			
			var trail;
			
			// Creates the trail object and adds it to the map
			trail = new Trail(value.name, value.lat, value.lon, value.address, value.city, value.zip,
					value.distance, value.difficulty, value.condition, value.avg_rating);
			trail.addToMap(objGlobalVars.objMap);
			
			// Saves a reference of the trail
			objGlobalVars.arrTrails[index] = trail;
		});
	});
});
	
	
	
	