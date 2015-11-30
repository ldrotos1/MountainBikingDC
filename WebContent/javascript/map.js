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
			
			// Sets the map height and the position of the map loading sprite
			setMapHeight();
			setLoadingGifPosition(div);
			
			// Creates the map bounds object
			var southWest = L.latLng(37.902113, -79.131942),
		    northEast = L.latLng(39.827281, -74.901855),
		    bounds = L.latLngBounds(southWest, northEast);
			
			// Creates the map
			var map = new L.map(div, {
				center: [38.942017,-77.042938],
				zoom: 10,
				minZoom: 9,
				zoomControl: true,
				maxBounds: bounds
			});
			
			// Creates and adds the base layer to the map
			var lyr = new L.tileLayer('http://api.tiles.mapbox.com/v4/ldrotos.5b90ed84/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGRyb3RvcyIsImEiOiJwQXgwZ2ZVIn0.pPrIMXZdwniJcp79DNpg9g', {
			    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://mapbox.com">Mapbox</a>',
			});
			
			// Removes the loading spinner once the map is loaded
			lyr.on( 'load', function(e) {
				$( '#loading-spinner' ).css( 'visibility', 'hidden' );
			});
			
			lyr.addTo(map);
			
			// Creates the map's home button
			L.easyButton( '<img class="map-btn" src="styles/images/home.png">', function(){
				  map.setView([38.942017,-77.042938], 10);
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
	 * Sets the position of the loading spinner so that
	 * it is over the center of the map
	 * @param div {string} The id of the map DIV. 
	 */
	function setLoadingGifPosition(div) {
		
		var numHeight,
		numWidth,
		numTop,
		numRight,
		objGif;
		
		// Gets map DIV dimensions
		numHeight = $( '#' + div ).height();
		numWidth = $( '#' + div ).width();
		
		// Computes the top and right CSS property values
		numTop = (numHeight / 2) - 15;
		numRight = (numWidth / 2) - 15;
		
		// Sets the Gif's position
		$( '#loading-spinner' ).css( 'top', numTop ).css( 'right', numRight);
	}
	
	/**
	 * Sets the height of the map pane
	 */
	function setMapHeight() {
		
		var numWinHeight,
		numHeadHeight;
		
		numWinHeight = $( window ).height();
		numHeadHeight = $( 'header' ).height();
		$( '#map' ).height(numWinHeight - numHeadHeight);
	}
	
}();