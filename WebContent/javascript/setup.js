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
		
		var arrNames = [],
		trail;
		
		$.each(data.val(), function( index, value ) {
			
			// Adds the trail name to array 
			arrNames[index] = value.name
			
			// Creates the trail object and adds it to the map
			trail = new Trail(value.name, value.lat, value.lon, value.address, value.city, value.state, value.zip,
					value.distance, value.difficulty, value.condition, value.avg_rating);
			trail.addToMap(objGlobalVars.objMap);
			
			// Saves a reference of the trail
			objGlobalVars.arrTrails[index] = trail;
		});
		
		// Initializes the search by name control
		$( "#search-name-control" ).autocomplete({
			source: arrNames
		});
		
		// Initializes the display trails by control
		$( "#display-by-control" ).selectmenu({
			width: 150,
			change: function( event, ui ) {
				
				// Determines what symbol scheme to use and applies
				// scheme to each of the trails
				var val = ui.item.value;
				
				if (val === 'Default') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbDefault();
					});
				}
				else if (val === 'Trail Condition') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbCondition();
					});
				}
				else if (val === 'Average Rating') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbAvgRating();
					});
				}
				else if (val === 'Beginner') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbBeginner();
					});
				}
				else if (val === 'Intermediate') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbIntermediate();
					});
				}
				else if (val === 'Advanced') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbAdvanced();
					});
				}
				else {
					console.log('Unknown display by value');
				}
			}
		});
	});
});
	
	
	
	