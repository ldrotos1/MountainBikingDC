/**
 * Louis Drotos
 * Sept 20, 2015
 * 
 * This module provides a namespace for code that creates 
 * and controls the trail information dialogs
 */

nsTrailInfoDialog = function(){
	
	return {
		
		/**
		 * Initializes the trail information dialog
		 */
		initDialog: function() {
			
			// Initializes the trail information dialog
			$( "#trail-info-dialog" ).dialog({
				autoOpen: false,
		    	modal: true,
		    	resizable: false,
		    	title: 'Trail Information',
		    	width: 500,
		    	beforeClose: function( event, ui ) {
		    		showTrailInfoDiv();
		    	},
		    	create: function( event, ui ) {
		    		showTrailInfoDiv();
		    	}
		    });
			
			// Initializes the trail information dialog buttons and 
			// wires the click events
			
			// Shows the review form
			$( '#btn-review-form' ).button().click( function() {
				
				$( '#info-dialog' ).fadeOut( 400, function(){
					$( '#review-dialog' ).fadeIn( 400 ).css( 'visibility', 'visible' );
			    });
			});
			
			// Closes the dialog
			$( '#btn-info-close' ).button().click( function() {
				
				$( '#trail-info-dialog' ).dialog( 'close' );
			});
			
			// Submits the review
			$( '#btn-submit-review' ).button().click( function() {
				
				// Shows the station info DIV
				showTrailInfoDiv();
			});
			
			// Shows the station info DIV
			$( '#btn-review-cancel' ).button().click( function() {
				showTrailInfoDiv();
			});
		},
		
		/**
		 * Opens the trail information dialog for the 
		 * specified trail.
		 * @param objTrail {object} The specified trail
		 */
		openTrailDialog: function(objTrail) {
			
			var objDbConn,
			strTrailName,
			strReviewDom;
			
			// Adds the trail information to the DOM
			$( '#trail-name' ).text( objTrail.name );
			$( '#trail-address-one' ).text( objTrail.address );
			$( '#trail-address-two' ).text( objTrail.city + ', ' + objTrail.state + ' ' + objTrail.zip );
			
			$( '#trail-dist' ).text( 'Distance: ' + objTrail.distance + ' miles' );
			$( '#trail-difficulty' ).text( 'Difficulty: ' + objTrail.getDifficulty() );
			$( '#trail-condition' ).text( 'Trail Condition: ' + objTrail.condition );
			$( '#trail-avg-rating' ).text( 'Average Rating: ' + objTrail.getAverageRating() );
			
			// Gets the trail name and removes all white space
			strTrailName = objTrail.name;
			strTrailName = strTrailName.replace(/ +/g, "");
			
			// Gets the review data for this trail from the back end
			objDbConn = new Firebase('https://radiant-torch-5066.firebaseio.com/reviews/' + strTrailName);
			objDbConn.once("value", function(data) {

				// Removes any reviews from previous trails
				$( ".first-trail-review, .middle-trail-review, .last-trail-review" ).remove();
				
				// Adds each review to the DOM
				$.each(data.val(), function( index, value ) {

					// Builds the DOM
					strReviewDom = "<div class=\'middle-trail-review\'>";
					strReviewDom += "<span>" + value.name + "</span><br>";
					strReviewDom += "<span>" + value.date + "</span><br>";
					strReviewDom += "<span>" + value.rating + " out of 5</span><br>";
					strReviewDom += "<p>" + value.comments + "</p>";
					strReviewDom += "</div>";
			
					// Adds the DOM
					$( "#trail-reviews-list" ).append( strReviewDom );
				});
				
				// Sets the DOM class for the first and last reviews
				$( '.middle-trail-review:first' ).addClass( 'first-trail-review' );
				$( '.middle-trail-review:last' ).removeClass( 'middle-trail-review' ).addClass( 'last-trail-review' );
			});
			
			// Shows the dialog
			$( '#trail-info-dialog' ).dialog( 'open' );
		}
	}
	
	/**
	 * Transitions from the review submission form DIV to the 
	 * trail info DIV on the trial information dialog
	 */
	function showTrailInfoDiv() {
		
		$( '#review-dialog' ).fadeOut( 400, function(){
			$( '#info-dialog' ).fadeIn( 400 );
	    });
	}
	
}();