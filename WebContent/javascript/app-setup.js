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
	var objDbRef = new Firebase('https://radiant-torch-5066.firebaseio.com/trails');
	objDbRef.once("value", function(data) {
		
		var arrNames = [],
		trail;
		
		$.each(data.val(), function( index, value ) {
			
			// Adds the trail name to array 
			arrNames.push(value.name);
			
			// Creates the trail object and adds it to the map
			trail = new Trail(value.name, value.lat, value.lon, value.address, value.city, value.state, value.zip,
					value.distance, value.difficulty, value.condition, value.condition_date, value.avg_rating);
			trail.addToMap(objGlobalVars.objMap);
			
			// Saves a reference of the trail
			objGlobalVars.arrTrails.push(trail);
		});
		
		// Wires methods for disabling map panning when cursor
		// is hovering over control pane
		$( "#controls-pane, #legend-pane" ).hover(
			function(){
				objGlobalVars.objMap.dragging.disable();
				objGlobalVars.objMap.doubleClickZoom.disable();
			},
			function(){
				objGlobalVars.objMap.dragging.enable();
				objGlobalVars.objMap.doubleClickZoom.enable();
			}
		);
		
		// Initializes the trail information controls
		nsTrailInfo.initTrailInfo(
				objGlobalVars.objMap, 
				objGlobalVars.strReviewsDB, 
				objGlobalVars.strTrailsDB,
				objGlobalVars.arrTrails);
		
		// Initializes the trail display controls
		nsTrailDisplay.initTrailDisplay(
				objGlobalVars.strTrailsDB, 
				objGlobalVars.arrTrails)
		
		// Makes the sidebar visible
		$( '#trail-info-sidebar' ).css( 'visibility', 'visible' )
		
		// Displays the control pane
		$( '#controls-pane' ).fadeIn( "slow" );
	});
	
	// Updates the trail state when its database representation changes
	objDbRef.on( 'child_changed', function(data) {
		
		// Gets the updated trail information
		var objUpdatedTrail = data.exportVal();
		
		// Finds the trail object to be updated
		$.each(objGlobalVars.arrTrails, function( index, value ) {
			
			if (objUpdatedTrail.name === value.name) {
				
				// Updates the properties that can be updated
				value.condition = objUpdatedTrail.condition;
				value.condDate = objUpdatedTrail.condition_date;
				value.avgRating = objUpdatedTrail.avg_rating;
				
				// Breaks out of loop
				return false;
			}
		});
		
		// Updates the filter and trail symbology
		var dfd = $.Deferred();
		dfd.done( nsTrailFilter.filterTrails( objGlobalVars.arrTrails ), 
				nsTrailDisplay.recomputeSymbology());
	});
});
	
	
	
	