/**
 * Louis Drotos
 * Sept 12, 2015
 * 
 * This module provides a namespace for code that creates and
 * controls the map
 */

nsMap = function(){
	
	/**
	 * Public functions
	 */
	return {
		
		/**
		 * Creates a new map object containing the applicaiton's basemap.
		 * @param div {string} The id of the DIV that the map will be attached to.
		 * @returns {object} The new map object
		 */
		createMap: function(div) {
			
			// Creates the map
			setMapHeight();
			var map = new L.map(div, {
				center: [38.892017,-77.042938],
				zoom: 10,
				minZoom: 10,
				zoomControl: false,
			});
			
			// Adds the base layer to the map
			L.tileLayer('http://api.tiles.mapbox.com/v4/ldrotos.5b90ed84/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGRyb3RvcyIsImEiOiJwQXgwZ2ZVIn0.pPrIMXZdwniJcp79DNpg9g', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://mapbox.com">Mapbox</a>',
			}).addTo(map);
			
			// Resizes map when window is resized
			$( window ).resize(function() {
				setMapHeight();
			});
			
			// Returns the map
			return map;
		}
	}
	
	/**
	 * Sets the height of the map pane
	 */
	function setMapHeight(){
		
		var numWinHeight,
		numHeadHeight;
		
		numWinHeight = $( window ).height();
		numHeadHeight = $( 'header' ).height();
		$( '#map' ).height(numWinHeight - numHeadHeight);
	}
	
}();