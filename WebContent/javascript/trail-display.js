/**
 * Louis Drotos
 * Oct 12, 2015
 * 
 * This module provides code that maintains the trails display
 * symbology and the map legend
 */

nsTrailDisplay = function(){
	
	this.type = 'DEFAULT';
	this.domDefault = undefined;
	this.domCondition = undefined;
	this.domRating = undefined;
	
	/**
	 * Public functions
	 */
	return {
		
		/**
		 * Initializes the trail display components, which includes the display 
		 * trails by select box and the map legend. Wires connection to the 
		 * database to ensure trail symbology is updated when database is
		 * updated.
		 * @param strTrailsUrl { string } The URL to the trails database.
		 * @param arrTrails { array[object] } The trail objects
		 */
		initTrailDisplay: function( strTrailsUrl, arrTrails ) {
			
			var self = this;
			//objTrailConn;
			
			//objTrailConn = new Firebase( strTrailsUrl );
			//objTrailConn.on("child_changed", function(data) {
				//alert("fired!");
			//});
			
			// Initializes the display trails by select menu.
			$( "#display-by-control" ).selectmenu({
				width: 150,
				change: function( event, ui ) {
					
					// Determines what symbol scheme to use and applies
					// scheme to each of the trails
					var strVal = ui.item.value;
					
					if (strVal === 'Default') {
						
						$.each(arrTrails, function( index, value ) {
							
							value.symbDefault();
						});
						
						// Updates the legend
						self._showDefaultLegend();
						
					}
					else if (strVal === 'Trail Condition') {
						
						$.each(arrTrails, function( index, value ) {
							
							value.symbCondition();
						});
						
						// Updates the legend
						self._showConditionLegend();
					}
					else if (strVal === 'Average Rating') {
						
						$.each(arrTrails, function( index, value ) {
							
							value.symbAvgRating();
						});
						
						// Updates the legend
						self._showRatingLegend();
					}
					else {
						console.log('Unknown display by value');
					}
				}
			});
		},
		
		/**
		 * Fades to the default legend if it is not already visible
		 */
		_showDefaultLegend: function() {
			
			if (this.type !== 'DEFAULT') {
			
				// Builds the new legend DOM if needed
				if (this.domDefault === undefined) {
				
					var dom = [];
					dom.push(
							'<div>',
							'<div>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_standard.png\'>',
							'<span class=\'legend-name\'>Mountain Bike Trail</span>',
							'</div>',
							'</div>'
							);
					this.domDefault = dom.join('');
				}
				
				// Updates the legend
				this._replaceLegend( this.domDefault );
				this.type = 'DEFAULT';
			}
		},
		
		/**
		 * Fades to the trail condition legend if it is not already visible
		 */
		_showConditionLegend: function() {
			
			// Builds the new legend DOM if needed
			if (this.domCondition === undefined) {
			
				var dom = [];
				dom.push(
						'<div>',
						'<div class=\'legend-title\'>Trail Condition</div>',
						'<div class=\'legend-top-item\'>',
						'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_cond_good.png\'>',
						'<span class=\'legend-name\'>Good - Dry</span>',
						'</div>',
						'<div class=\'legend-middle-item\'>',
						'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_cond_fair.png\'>',
						'<span class=\'legend-name\'>Fair - Some wet spots</span>',
						'</div>',
						'<div class=\'legend-bottom-item\'>',
						'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_cond_bad.png\'>',
						'<span class=\'legend-name\'>Bad - Muddy</span>',
						'</div>',
						'</div>'
						);
				this.domCondition = dom.join('');
			}
			
			if (this.type !== 'CONDITION') {
				
				// Updates the legend
				this._replaceLegend( this.domCondition );
				this.type = 'CONDITION';
			}
		},
		
		/**
		 * Fades to the average rating legend if it is not already visible
		 */
		_showRatingLegend: function() {
			
			if (this.type !== 'RATING') {
				
				// Builds the new legend DOM if needed
				if (this.domRating === undefined) {
				
					var dom = [];
					dom.push(
							'<div>',
							'<div class=\'legend-title\'>Average Trail Rating</div>',
							'<div class=\'legend-top-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_5_star.png\'>',
							'<span class=\'legend-name\'>5 out of 5</span>',
							'</div>',
							'<div class=\'legend-middle-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_4_star.png\'>',
							'<span class=\'legend-name\'>4 out of 5</span>',
							'</div>',
							'<div class=\'legend-middle-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_3_star.png\'>',
							'<span class=\'legend-name\'>3 out of 5</span>',
							'</div>',
							'<div class=\'legend-middle-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_2_star.png\'>',
							'<span class=\'legend-name\'>2 out of 5</span>',
							'</div>',
							'<div class=\'legend-bottom-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_1_star.png\'>',
							'<span class=\'legend-name\'>1 out of 5</span>',
							'</div>',
							'</div>'
							);
					this.domRating = dom.join('');
				}
				
				// Updates the legend
				this._replaceLegend( this.domRating );
				this.type = 'RATING';
			}
		},
		
		/**
		 * Replaces the legend DOM with the a new DOM. Includes a fade out 
		 * and fade in transition effect.
		 * @param strDom {string} The new DOM to be placed within the legend  
		 */
		_replaceLegend: function(strDom) {
			
			$( '#legend-pane' ).fadeOut( 300, function(){
				
				var test = $( '#legend-pane:first-child' );
				$( '#legend-pane div' ).replaceWith( strDom );
				$( '#legend-pane' ).fadeIn( 300 );
			});
		}
	}
}();