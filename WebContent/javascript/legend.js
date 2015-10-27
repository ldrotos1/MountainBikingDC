/**
 * Louis Drotos
 * Oct 12, 2015
 * 
 * This module provides code that is used for
 * working with the map legend.
 */

nsLegend = function(){
	
	this.type = 'DEFAULT';
	this.domDefault = undefined;
	this.domCondition = undefined;
	this.domRating = undefined;
	this.domBeginner = undefined;
	this.domIntermediate = undefined;
	this.domAdvanced = undefined;
	
	/**
	 * Public functions
	 */
	return {
		
		/**
		 * Returns a string indicating which legend is being shown
		 * @return {string} The legend being shown.
		 */
		getCurrentLegend: function() {
			return this.type;
		},
		
		/**
		 * Fades to the default legend if it is not already visible
		 */
		showDefaultLegend: function() {
			
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
				replaceLegend( this.domDefault );
				this.type = 'DEFAULT';
			}
		},
		
		/**
		 * Fades to the trail condition legend if it is not already visible
		 */
		showConditionLegend: function() {
			
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
				replaceLegend( this.domCondition );
				this.type = 'CONDITION';
			}
		},
		
		/**
		 * Fades to the average rating legend if it is not already visible
		 */
		showRatingLegend: function() {
			
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
				replaceLegend( this.domRating );
				this.type = 'RATING';
			}
		},
		
		/**
		 * Fades to the beginner legend if it is not already visible
		 */
		showBeginnerLegend: function() {
			
			if (this.type !== 'BEGINNER') {
				
				// Builds the new legend DOM if needed
				if ( this.domBeginner === undefined) {
				
					var dom = [];
					dom.push(
							'<div>',
							'<div class=\'legend-title\'>Trail Difficulty</div>',
							'<div class=\'legend-top-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_beginner.png\'>',
							'<span class=\'legend-name\'>Beginner</span>',
							'</div>',
							'<div class=\'legend-bottom-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_grey_out.png\'>',
							'<span class=\'legend-name\'>Other</span>',
							'</div>',
							'</div>'
							);
					this.domBeginner = dom.join('');
				}
				
				// Updates the legend
				replaceLegend( this.domBeginner );
				this.type = 'BEGINNER';
			}
		},
		
		/**
		 * Fades to the intermediate legend if it is not already visible
		 */
		showIntermediateLegend: function() {
			
			if (this.type !== 'INTERMEDIATE') {
				
				// Builds the new legend DOM if needed
				if ( this.domIntermediate === undefined) {
				
					var dom = [];
					dom.push(
							'<div>',
							'<div class=\'legend-title\'>Trail Difficulty</div>',
							'<div class=\'legend-top-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_intermediate.png\'>',
							'<span class=\'legend-name\'>Intermediate</span>',
							'</div>',
							'<div class=\'legend-bottom-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_grey_out.png\'>',
							'<span class=\'legend-name\'>Other</span>',
							'</div>',
							'</div>'
							);
					this.domIntermediate = dom.join('');
				}
				
				// Updates the legend
				replaceLegend( this.domIntermediate );
				this.type = 'INTERMEDIATE';
			}
		},
		
		/**
		 * Fades to the advanced legend if it is not already visible
		 */
		showAdvancedLegend: function() {
			
			if (this.type !== 'ADVANCED') {
				
				// Builds the new legend DOM if needed
				if ( this.domAdvanced === undefined) {
				
					var dom = [];
					dom.push(
							'<div>',
							'<div class=\'legend-title\'>Trail Difficulty</div>',
							'<div class=\'legend-top-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_advanced.png\'>',
							'<span class=\'legend-name\'>Advanced</span>',
							'</div>',
							'<div class=\'legend-bottom-item\'>',
							'<img class=\'legend-icon\' src=\'styles/images/trail_icons/trail_icon_grey_out.png\'>',
							'<span class=\'legend-name\'>Other</span>',
							'</div>',
							'</div>'
							);
					this.domAdvanced = dom.join('');
				}
				
				// Updates the legend
				replaceLegend( this.domAdvanced );
				this.type = 'ADVANCED';
			}
		}
	}
	
	/**
	 * Replaces the legend DOM with the a new DOM. Includes a fade out 
	 * and fade in transition effect.
	 * @param strDom {string} The new DOM to be placed within the legend  
	 */
	function replaceLegend(strDom) {
		
		$( '#legend-pane' ).fadeOut( 300, function(){
			
			var test = $( '#legend-pane:first-child' );
			$( '#legend-pane div' ).replaceWith( strDom );
			$( '#legend-pane' ).fadeIn( 300 );
		});
	}
}();