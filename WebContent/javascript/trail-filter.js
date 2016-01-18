/**
 * Louis Drotos
 * Nov 16, 2015
 * 
 * This module contains code for controlling the application's
 * trail filtering functionality.
 */

$( window ).load(function() {
	
	// Initializes filter controls
	$("#rating-slider").slider({
		range:true,
		min: 1, 
	    max: 5,
	    values: [1,5],
	    stop: function( event, ui ){
	    	nsTrailFilter.filterTrails(objGlobalVars.arrTrails);
	    }
	}).slider('pips', {
		rest:"label"
	})
	
	$( '#btn-reset-filter' ).button();
	
	// Wires the event handlers for the filter controls
	$( '.filter-checkbox' ).change(function(evt){
		nsTrailFilter.filterTrails(objGlobalVars.arrTrails);
	});
	
	$("#btn-reset-filter").click(function(){
		nsTrailFilter.resetFilter(objGlobalVars.arrTrails);
	});
});

nsTrailFilter = function(){
	
	return {
		
		filterTrails: function(arrTrails){
			
			var arrValues, numUpper, numLower, arrCheckBoxes,
			boolGood, boolFair, boolBad, boolBegin, boolInterm,
			boolAdv, boolFilterOut;
			
			// Gets the values of the filter controls
			arrValues = $( '#rating-slider' ).slider( "values" );
			numUpper = arrValues[1];
			numLower = arrValues[0];
			
			arrCheckBoxes = $( '.filter-checkbox' );
			boolGood = arrCheckBoxes[0].checked;
			boolFair = arrCheckBoxes[1].checked;
			boolBad = arrCheckBoxes[2].checked;
			boolBegin = arrCheckBoxes[3].checked;
			boolInterm = arrCheckBoxes[4].checked;
			boolAdv = arrCheckBoxes[5].checked;
			
			// Updates the rating slider label 
			setSliderLabel(numLower, numUpper);
			
			// Determine if trail should be filtered out or in
			$.each( arrTrails, function(index, trail){
				
				boolFilterOut = false;
				
				// Compare trail to average rating range
				if (trail.avgRating <  numLower || trail.avgRating > numUpper) {
					boolFilterOut = true;
				}
				
				// Compare trail to condition
				if (trail.condition === 'Good' && boolGood === false){
					boolFilterOut = true;
				}
				else if (trail.condition === 'Fair' && boolFair === false){
					boolFilterOut = true;
				}
				else if (trail.condition === 'Bad' && boolBad === false){
					boolFilterOut = true;
				}
				
				// Compare trail to difficulty
				if (boolBegin === false && boolInterm === false && boolAdv === false) {
					boolFilterOut = true;
				}
				else if (trail.difficulty === 1 && boolBegin === false) {
					boolFilterOut = true;
				}
				else if (trail.difficulty === 2 && boolInterm === false) {
					boolFilterOut = true;
				}
				else if (trail.difficulty === 4 && boolAdv === false) {
					boolFilterOut = true;
				}
				else if (trail.difficulty === 3 && boolBegin === false && boolInterm === false) {
					boolFilterOut = true;
				}
				else if (trail.difficulty === 6 && boolInterm === false && boolAdv === false) {
					boolFilterOut = true;
				}
				
				// Marks the trail as being filtered out or in
				if (boolFilterOut === true){
					trail.filterOut();
				}
				else {
					trail.filterIn();
				}
			})
		},
	
		/**
		 * Resets the filter controls and shows all trails
		 * @param arrTrails {array} An array of trail objects
		 */
		resetFilter: function(arrTrails){
			
			// Checks all check boxes
			var arrBoxes = $( '.filter-checkbox' );
			$.each( arrBoxes, function(index, item){
				item.checked = true;
			});
			
			// Resets slider
			$("#rating-slider").slider( "values", 0, 1 ).slider( "values", 1, 5 );
			setSliderLabel(1, 5);
			
			// Sets all the trails as being filtered in
			$.each( arrTrails, function(index, item){
				item.filterIn();
			});
		}
	}
	
	/**
	 * Updates the rating slider label for a new specified range
	 * @param numLow {number} The lower value of the range
	 * @param numHigh {number} The upper value of the range 
	 */
	function setSliderLabel(numLow, numHigh) {
		
		var strLabel;
		
		if (numLow === numHigh) {
		
			strLabel = getRatingLabel(numLow);
			
		} else {
			
			strLabel = getRatingLabel(numLow) + " to " + getRatingLabel(numHigh);
		}
			
		$( '#rating-range-label' ).text( strLabel );
	}
	
	/**
	 * Provides the label for a specified rating number
	 * @param numValue {number} The rating number
	 * @returns {string} The rating label
	 */
	function getRatingLabel(numValue) {
	
		if (numValue === 1) {
			return "1 Star";
		}
		else if (numValue === 2) {
			return "2 Stars";
		}
		else if (numValue === 3) {
			return "3 Stars";
		}
		else if (numValue === 4) {
			return "4 Stars";
		}
		else if (numValue === 5) {
			return "5 Stars";
		}
		else {
			return "";
		}
	}
}();

















