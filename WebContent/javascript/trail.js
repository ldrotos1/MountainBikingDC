/**
 * Louis Drotos
 * Sept 12, 2015
 * 
 * This module provides a class that represents a
 * trail marker. 
 */

/**
 * Provides a object that represents a trail
 * 
 * @param name {string} The trail's name
 * @param lat {number} The trail's latitude
 * @param lon {number} The trail's longitude
 * @param address {string} The trail's address
 * @param city {string} The trail's city
 * @param zip {string} The trail's zipcode
 * @param dist {number} The trail's distance in miles
 * @param difficulty {number} The trail's difficulty represented by an integer
 * @param condition {string} The trail's condition (Good, Fair, Bad)
 * @param avgRating {number} The trail's average rating
 * @param reviews {array} An array of Review objects
 * @return {object} The new Trail object 
 */
function Trail(name, lat, lon, address, city, zip, dist, difficulty, condition, avgRating, reviews){
	
	this.name = name;
	this.address = address;
	this.city = city;
	this.zip = zip;
	this.dist = dist;
	this.difficulty = difficulty;
	this.condition = condition;
	this.avgRating = avgRating;
	this.reviews = reviews;
	this.marker = L.marker(new L.latLng(lat, lon), {
		icon: L.icon({
			iconUrl: 'styles/images/biking_icon_org.png',
		    iconSize: [20, 20],
		    iconAnchor: [10, 10]
		})
	});
}

/**
 * Class functions
 */
Trail.prototype = {
		
		/**
		 * Constructor
		 * @returns A new Trail instance
		 */
		constructor: Trail,
		
		/**
		 * Adds this Trail object to a map.
		 * @param map {object} The map that this will be added to.
		 */
		addToMap: function(map) {
			
			var self = this;
			
			this.marker.addTo(map);
		}
}