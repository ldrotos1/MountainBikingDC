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
	this.selected = false;
	this.icon = 'styles/images/trail_icons/trail_icon_standard.png'; 
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
		},

		/**
		 * Sets the trail's symbol to the default
		 */
		symbDefault: function() {
			
			this.updateIcon('styles/images/trail_icons/trail_icon_standard.png');
		},
		
		/**
		 * Sets the trail's symbol based on the trail condition
		 */
		symbCondition: function() {
			
			if (this.condition === 'Good') {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_cond_good.png');
			}
			else if (this.condition === 'Fair') {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_cond_fair.png');
			}
			else if (this.condition === 'Bad') {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_cond_bad.png');
			}
			else {
				console.log("Unknown trail condition");
			}
		},
		
		/**
		 * Sets the trail's symbol based on the average rating
		 */
		symbAvgRating: function() {
			
			if (this.avgRating === 0) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_grey_out.png');
			}
			else if (this.avgRating === 1) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_1_star.png');
			}
			else if (this.avgRating === 2) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_2_star.png');
			}
			else if (this.avgRating === 3) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_3_star.png');
			}
			else if (this.avgRating === 4) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_4_star.png');
			}
			else if (this.avgRating === 5) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_5_star.png');
			}
			else {
				console.log("Unknown trail rating");
			}
		},
		
		/**
		 * Sets the trail's symbol based on whether or not a
		 * beginner trail is available 
		 */
		symbBeginner: function() {
			
			if (this.difficulty === 1 || this.difficulty === 3 || this.difficulty === 7) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_beginner.png');
			}
			else {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_grey_out.png');
			}
		},
		
		/**
		 * Sets the trail's symbol based on whether or not a
		 * intermediate trail is available 
		 */
		symbIntermediate: function() {
			
			if (this.difficulty === 2 || this.difficulty === 3 || this.difficulty === 6) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_intermediate.png');
			}
			else {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_grey_out.png');
			}
		},
		
		/**
		 * Sets the trail's symbol based on whether or not a
		 * advance trail is available 
		 */
		symbAdvanced: function() {
			
			if (this.difficulty === 4 || this.difficulty === 6 || this.difficulty === 7) {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_advanced.png');
			}
			else {
				
				this.updateIcon('styles/images/trail_icons/trail_icon_grey_out.png');
			}
		},
		
		/**
		 * Changes the icon representing the trail on the amp
		 * @param url {string} The URL to the new icon
		 */
		updateIcon: function(url) {
			
			this.icon = url;
			
			if (this.selected == true) {
				
				this.marker.setIcon(new L.icon({
					iconUrl: this.icon,
					iconSize: [40, 40],
					iconAnchor: [20, 20]
				}));
			}
			else {
				
				this.marker.setIcon(new L.icon({
					iconUrl:this.icon,
					iconSize: [30, 30],
					iconAnchor: [15, 15]
				}));
			}
		}
}

