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
	
	// Setups the trail information dialog
	nsTrailInfoDialog.initDialog();
	
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
		
		// Adds the trail names to the select by trail menu
		var menuNode = $( '#select-name-control' )
		$.each(arrNames, function(index, value){
			menuNode.prepend( "<option>" + value + "</option>" );
		})
		
		// Initializes the search by name control
		$( "#select-name-control" ).selectmenu({
			width: 150,
			change: function( event, ui ) {
				
				var strVal,
				objCoord;
				
				// Iterates through the trails to find the selected trail
				strVal = ui.item.value;
				$.each(objGlobalVars.arrTrails, function( index, value ) {
					
					if (value.name === strVal) {
						
						// Enlarges the marker of the selected trail and centers the 
						// map on the marker.
						value.selectTrail();
						objGlobalVars.objMap.setView(value.coord);
					}
					else {
						
						// Ensures that this trail is not selected
						value.unselectTrail();
					}
				});
			}
		});
		
		// Initializes the display trails by control
		$( "#display-by-control" ).selectmenu({
			width: 150,
			change: function( event, ui ) {
				
				// Determines what symbol scheme to use and applies
				// scheme to each of the trails
				var strVal = ui.item.value;
				
				if (strVal === 'Default') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbDefault();
					});
					
					// Updates the legend
					nsLegend.showDefaultLegend();
					
				}
				else if (strVal === 'Trail Condition') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbCondition();
					});
					
					// Updates the legend
					nsLegend.showConditionLegend();
				}
				else if (strVal === 'Average Rating') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbAvgRating();
					});
					
					// Updates the legend
					nsLegend.showRatingLegend();
				}
				else if (strVal === 'Beginner') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbBeginner();
					});
					
					// Updates the legend
					nsLegend.showBeginnerLegend();
				}
				else if (strVal === 'Intermediate') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbIntermediate();
					});
					
					// Updates the legend
					nsLegend.showIntermediateLegend();
				}
				else if (strVal === 'Advanced') {
					
					$.each(objGlobalVars.arrTrails, function( index, value ) {
						
						value.symbAdvanced();
					});
					
					// Updates the legend
					nsLegend.showAdvancedLegend();
				}
				else {
					console.log('Unknown display by value');
				}
			}
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
		
		// Displays the control pane
		$( '#controls-pane' ).fadeIn( "slow" );
	});
});
	
	
	
	