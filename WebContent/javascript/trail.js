/**
 * Louis Drotos
 * Sept 13, 2015
 * 
 * This module provides a class that represents
 * a mountain bike trail.
 */

/**
 * Entity class that represents a mountain bike trail.
 * @param name {string} The trail name
 * @param lat {number} The trail's latitude
 * @param lon {number} The trail's longitude
 * @param address {string} The trail's address
 * @param city {string} The trail's city
 * @param state {string} The trail's state
 * @param zip {string} The trail's zipcode
 * @param dist {number} The trail's distance in miles
 * @param difficulty {number} The difficulty of the trail
 * @param condition {string} The trail's current condition (Good, Fair, Bad)
 * @param avgRating {number} The trail's average rating  
 */
function Trail(name, lat, lon, address, city, state, zip, dist, difficulty, condition, avgRating) {
	
	this.name = name;
	this.address = address;
	this.city = city;
	this.state = state;
	this.zip = zip;
	this.distance = dist;
	this.difficulty = difficulty;
	this.condition = condition;
	this.avgRating = avgRating;
	this.icon = 'styles/images/biking_icon_org.png'; 
	this.marker = new L.marker(new L.latLng(lat, lon), {
		title: name,
		icon: new L.icon({
			iconUrl: this.icon,
		    iconSize: [30, 30],
		    iconAnchor: [15, 15]
		})
	})
}

/**
 * Public functions
 */
Trail.prototype = {
		
		/**
		 * Constructor
		 * @returns A new Trail instance
		 */
		constructor: Trail,
		
		/**
		 * Adds this object to a map
		 * @param map {object} The this will be added to
		 */
		addToMap: function(map) {
			
			var self = this;
			
			// Adds the on hover functionality
			this.marker.on('mouseover', function(e) {
				e.target.setIcon(new L.icon({
					iconUrl: self.icon,
					iconSize: [40, 40],
					iconAnchor: [20, 20]
				}))
			});
			
			// Adds the off hover functionality
			this.marker.on('mouseout', function(e) {
				e.target.setIcon(new L.icon({
					iconUrl: self.icon,
				    iconSize: [30, 30],
				    iconAnchor: [15, 15]
				}))
			});
			
			// Adds the marker to the map
			this.marker.addTo(map);
		}
}

