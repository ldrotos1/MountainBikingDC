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
 * @param condDate {string} The date of the trail condition 
 * @param avgRating {number} The trail's average rating  
 */
function Trail(name, lat, lon, address, city, state, zip, dist, difficulty, condition, condDate, avgRating) {
	
	this.name = name;
	this.address = address;
	this.city = city;
	this.state = state;
	this.zip = zip;
	this.distance = dist;
	this.difficulty = difficulty;
	this.condition = condition;
	this.condDate = condDate;
	this.avgRating = avgRating;
	this.selected = false;
	this.coord = new L.latLng(lat, lon)
	this.icon = 'styles/images/trail_icons/trail_icon_standard.png'; 
	this.displayBy = 'DEFAULT',
	this.filteredOut = false,
	this.marker = new L.marker(this.coord, {
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
			
			// Show trail information sidebar when trail icon is clicked
			this.marker.on('click', function(e) {
				
				nsTrailInfo.showTrailInfo(self);
			});
			
			// Adds the marker to the map
			this.marker.addTo(map);
		},

		/**
		 * Displays the trail in the map as being selected
		 */
		selectTrail: function() {
			
			this.marker.setIcon(new L.icon({
				iconUrl: this.icon.replace('.png', '_HL.png'),
				iconSize: [50, 50],
				iconAnchor: [25, 25]
			}));
		},
		
		/**
		 * Displays the trail in the map as being unselected
		 */
		unselectTrail: function() {
			
			this.marker.setIcon(new L.icon({
				iconUrl: this.icon,
				iconSize: [30, 30],
				iconAnchor: [15, 15]
			}));
		},
		
		/**
		 * Returns the written statement of the trail's difficulty.
		 * @returns {string} The trail difficulty.
		 */
		getDifficulty: function() {
			
			var numDiff = this.difficulty;
			
			if (numDiff === 1) {
				
				return 'Beginner';
			}
			else if (numDiff === 2) {
				
				return 'Intermediate';
			}
			else if (numDiff === 3) {
				
				return 'Beginner to Intermediate';
			}
			else if (numDiff === 4) {
				
				return 'Advanced';
			}
			else if (numDiff === 6) {
				
				return 'Intermediate to Advanced';
			}
			else if (numDiff === 7) {
				
				return 'Beginner to Advanced';
			}
			else {
				console.log('Unknown difficulty')
				return null;
			}
		},
		
		/**
		 * Returns the written statement of the trail's average rating.
		 * @returns {string} The trail's average rating.
		 */
		getAverageRating: function() {
			
			var numRating = this.avgRating;
			
			if (numRating === 0) {
				
				return 'Trail not rated'
			}
			else if (numRating === 1) {
				return '1 out of 5 Stars'
			}
			else if (numRating === 2) {
				return '2 out of 5 Stars'
			}
			else if (numRating === 3) {
				return '3 out of 5 Stars'
			}
			else if (numRating === 4) {
				return '4 out of 5 Stars'
			}
			else if (numRating === 5) {
				return '5 out of 5 Stars'
			}
		},
		
		/**
		 * Renders this trail icon as being filtered out
		 */
		filterOut: function() {
			
			if (this.filteredOut === false) {
				
				this.filteredOut = true;
				this.updateIcon('styles/images/trail_icons/trail_icon_filtered_out.png');
			}
		},
		
		/**
		 * Renders this trail icon as being filtered in
		 */
		filterIn: function() {
			
			if (this.filteredOut === true) {
				
				this.filteredOut = false;
				
				if (this.displayBy === 'DEFAULT') {
					this.symbDefault();
				}
				else if (this.displayBy === 'CONDITION') {
					this.symbCondition();
				}
				else if (this.displayBy === 'RATING') {
					this.symbAvgRating();
				}
				else {
					console.log("Unknown display trail by value.");
				}
			}
		},
		
		/**
		 * Sets the trail's symbol to the default
		 */
		symbDefault: function() {
			
			this.displayBy = 'DEFAULT';
			
			if (this.filteredOut === false) {
				this.updateIcon('styles/images/trail_icons/trail_icon_standard.png');
			}
		},
		
		/**
		 * Sets the trail's symbol based on the trail condition
		 */
		symbCondition: function() {
			
			this.displayBy = 'CONDITION';
			
			if (this.filteredOut === false) {
				
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
			}
		},
		
		/**
		 * Sets the trail's symbol based on the average rating
		 */
		symbAvgRating: function() {
			
			this.displayBy = 'RATING';
			
			if (this.filteredOut === false) {
				
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

