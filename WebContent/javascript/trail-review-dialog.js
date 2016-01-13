/**
* Louis Drotos
 * Dec 20, 2015
 * 
 * This module creates and controls the review submission
 * dialog box.
 */

/**
 * Wires event handlers for rating start events once the page
 * is loaded.
 */
$( window ).load(function() {

	// Wires rating star hover on/off events
	$( ".rating-star" ).hover(
		function() {
			
			if (this.id === 'one-star') {
				
				$( this ).addClass( "hover-star" );
			}
			else if (this.id === 'two-star') {
				
				$( this ).addClass( "hover-star" );
				$( '#one-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
			}
			else if (this.id === 'three-star') {
				
				$( this ).addClass( "hover-star" );
				$( '#one-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
				$( '#two-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
			}
			else if (this.id === 'four-star') {
				
				$( this ).addClass( "hover-star" );
				$( '#one-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
				$( '#two-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
				$( '#three-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
			}
			else if (this.id === 'five-star') {
				
				$( this ).addClass( "hover-star" );
				$( '#one-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
				$( '#two-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
				$( '#three-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
				$( '#four-star' ).addClass( "hover-star" ).removeClass( "empty-star full-star" );
			}
			else {
				console.log("Error: Invalid rating star ID.");
			}
			$( this ).removeClass( "empty-star full-star" );

		}, function() {
			
			var numRating = objGlobalVars.numRating;
			
			if (numRating === 0) {
				
				$( '.rating-star' ).addClass( "empty-star" );
			}
			else if (numRating === 1) {
				
				$( '#one-star' ).addClass( "full-star" );
				$( '#two-star' ).addClass( "empty-star" );
				$( '#three-star' ).addClass( "empty-star" );
				$( '#four-star' ).addClass( "empty-star" );
				$( '#five-star' ).addClass( "empty-star" );
			}
			else if (numRating === 2) {
				
				$( '#one-star' ).addClass( "full-star" );
				$( '#two-star' ).addClass( "full-star" );
				$( '#three-star' ).addClass( "empty-star" );
				$( '#four-star' ).addClass( "empty-star" );
				$( '#five-star' ).addClass( "empty-star" );
			}
			else if (numRating === 3) {
				
				$( '#one-star' ).addClass( "full-star" );
				$( '#two-star' ).addClass( "full-star" );
				$( '#three-star' ).addClass( "full-star" );
				$( '#four-star' ).addClass( "empty-star" );
				$( '#five-star' ).addClass( "empty-star" );
			}
			else if (numRating === 4) {
				
				$( '#one-star' ).addClass( "full-star" );
				$( '#two-star' ).addClass( "full-star" );
				$( '#three-star' ).addClass( "full-star" );
				$( '#four-star' ).addClass( "full-star" );
				$( '#five-star' ).addClass( "empty-star" );
			}
			else if (numRating === 5) {
				
				$( '.rating-star' ).addClass( "full-star" );
			}
			else {
				console.log("Error: Invalid rating star number.");
			}
			
			$( '.rating-star' ).removeClass( "hover-star" );
		}
	);
	
	// Wires the rating star click events
	$( ".rating-star" ).click(function(evt){
		
		var strRating = evt.target.id;
		if (strRating === 'one-star') {
			
			objGlobalVars.numRating = 1;
			
			$( '#one-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			
			setTimeout(function(){
				$( "#one-star" ).addClass( "full-star" ).removeClass( "click-star" );
				
				$( '#two-star' ).addClass( "empty-star" ).removeClass( "full-star" );
				$( '#three-star' ).addClass( "empty-star" ).removeClass( "full-star" );
				$( '#four-star' ).addClass( "empty-star" ).removeClass( "full-star" );
				$( '#five-star' ).addClass( "empty-star" ).removeClass( "full-star" );
			}, 100)
			
		}
		else if (strRating === 'two-star') {
			
			objGlobalVars.numRating = 2;
			
			$( '#one-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			$( '#two-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			
			setTimeout(function(){
				$( "#one-star" ).addClass( "full-star" ).removeClass( "click-star" );
				$( "#two-star" ).addClass( "full-star" ).removeClass( "click-star" );
				
				$( '#three-star' ).addClass( "empty-star" ).removeClass( "full-star" );
				$( '#four-star' ).addClass( "empty-star" ).removeClass( "full-star" );
				$( '#five-star' ).addClass( "empty-star" ).removeClass( "full-star" );
			}, 100)
		}
		else if (strRating === 'three-star') {
			
			objGlobalVars.numRating = 3;
			
			$( '#one-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			$( '#two-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			$( '#three-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			
			setTimeout(function(){
				$( "#one-star" ).addClass( "full-star" ).removeClass( "click-star" );
				$( "#two-star" ).addClass( "full-star" ).removeClass( "click-star" );
				$( "#three-star" ).addClass( "full-star" ).removeClass( "click-star" );
				
				$( '#four-star' ).addClass( "empty-star" ).removeClass( "full-star" );
				$( '#five-star' ).addClass( "empty-star" ).removeClass( "full-star" );
			}, 100)
		}
		else if (strRating === 'four-star') {
			
			objGlobalVars.numRating = 4;
			
			$( '#one-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			$( '#two-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			$( '#three-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			$( '#four-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			
			setTimeout(function(){
				$( "#one-star" ).addClass( "full-star" ).removeClass( "click-star" );
				$( "#two-star" ).addClass( "full-star" ).removeClass( "click-star" );
				$( "#three-star" ).addClass( "full-star" ).removeClass( "click-star" );
				$( "#four-star" ).addClass( "full-star" ).removeClass( "click-star" );
				
				$( '#five-star' ).addClass( "empty-star" ).removeClass( "full-star" );
			}, 100)
		}
		else if (strRating === 'five-star') {
			
			objGlobalVars.numRating = 5;
			
			$( '.rating-star' ).addClass( "click-star" ).removeClass( "hover-star" );
			
			setTimeout(function(){
				$( ".rating-star" ).addClass( "full-star" ).removeClass( "click-star" );
			}, 100)
		}
		else {
			console.log("Error: Invalid rating star ID.");
		}
		
		// Moves focus to the comments text area
		$( "#reviewer-comments" ).focus();
	});
});

nsTrailReviewForm = function(){
	
	this.dialog = undefined;
	
	/**
	 * Public functions
	 */
	return {
		
		/**
		 * Creates and displays the trail review submission dialog.
		 */
		showReviewForm: function() {

			// Initializes the dialog if needed
			if (this.dialog === undefined ) {
				
				var self = this;
				
				// Initializes the review submission button and wires the 
				// click event handler to submit a review
				$( '#btn-submit-review' ).button().on( 'click', function(evt) {
					
					var strName,
					strRating,
					numRating,
					strDate,
					strComment,
					strTrailName,
					strReviewDom,
					objDbConn,
					objNewReview;
					
					// Gets the user inputs 
					strName = $( '#reviewer-name' ).val();
					strComment = $( '#reviewer-comments' ).val();
					numRating = objGlobalVars.numRating;
					
					if (strComment === '') {
						strComment = "No comments provided.";
					}
					
					// Validates inputs
					if (strName === '' || numRating === 0) {
					
						alert("Please provide at least a name and a rating.");
					}
					else if (numRating < 1 || numRating > 5 ){
						
						alert("The rating must be between 1 and 5.");
					}
					else {
						
						// Adds the review to the review list
						strDate = new Date().toJSON().slice( 0, 10 );
						strReviewDom = "<div class=\'middle-trail-review\'>";
						strReviewDom += "<span>" + strName + "</span><br>";
						strReviewDom += "<span>" + strDate + "</span><br>";
						strReviewDom += "<span>" + numRating + " out of 5 Stars</span><br>";
						strReviewDom += "<p>" + strComment + "</p>";
						strReviewDom += "</div>";
						$( "#trail-reviews-list" ).prepend( strReviewDom );
						
						// Updates review classes
						$( '.first-trail-review:first' ).removeClass( 'first-trail-review' );
						$( '.middle-trail-review:first' ).addClass( 'first-trail-review' );
						
						// Gets the trail name and removes any spaces
						strTrailName = $( '#trail-name' ).text();
						strTrailName = strTrailName.replace(/ +/g, "");
						
						// Pushes the new review to the database
						objDbConn = new Firebase('https://radiant-torch-5066.firebaseio.com/reviews/' + strTrailName);
						objNewReview = objDbConn.push();
						objNewReview.set({ 
							'name': strName, 
							'date': strDate,
							'rating': numRating.toString(), 
							'comments': strComment
						});
						
						// Closes the dialog
						self.dialog.dialog( 'close' );
					}
				});
				
				// Initializes the dialog
				this.dialog = $( "#trail-review-dialog" ).dialog({
					autoOpen: false,
			    	modal: true,
			    	resizable: false,
			    	title: 'Submit Trail Review',
			    	width: 600,
			    	open: function() {
			    		$('.leaflet-control-container').addClass('ui-widget-overlay');
			    	},
			    	close: function() {
			    		$( '.leaflet-control-container' ).removeClass( 'ui-widget-overlay' );
			    		
			    		// Resets the name and comments section
			    		$( '#reviewer-name' ).val('');
						$( '#reviewer-comments' ).val('');
			    		
			    		// Resets the rating stars
			    		objGlobalVars.numRating = 0;
			    		$( ".rating-star" ).addClass( "empty-star" ).removeClass( "full-star" );
			    	}
			    })
			}
			
			// Displays the dialog
			this.dialog.dialog( 'open' );
		}
	}
}();