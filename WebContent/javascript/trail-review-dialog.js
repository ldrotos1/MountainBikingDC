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
		showReviewForm: function(strReviewsUrl, strTrailsUrl) {

			// Initializes the dialog if needed
			if (this.dialog === undefined ) {
				
				var self = this;
				
				// Initializes the review submission button and wires the 
				// click event handler to submit a review
				$( '#btn-submit-review' ).button().on( 'click', function(evt) {
					
					var strName,
					strRating,
					numRating,
					numAvgRating,
					strDate,
					strComment,
					strTrailName,
					strReviewDom,
					objDbConnReviews,
					objDbConnTrails,
					objNewReview,
					objNewAvgRating;
					
					try {
						
						// Gets the user inputs 
						strName = $( '#reviewer-name' ).val();
						strComment = $( '#reviewer-comments' ).val();
						numRating = objGlobalVars.numRating;
						strDate = new Date().toJSON().slice( 0, 10 );
						
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
							
							// Gets the trail name and removes any spaces
							strTrailName = $( '#trail-name' ).text();
							strTrailName = strTrailName.replace(/ +/g, "");
							
							// Creates the database connection 
							objDbConnReviews = new Firebase(strReviewsUrl + strTrailName);
							
							// Gets the list of current reviews and computes the new average rating
							objDbConnReviews.once("value", function(dataset) {
								
								var numTotalRating = numRating,
								numCount = 1;
								
								// Sums the the existing reviews' ratings
								dataset.forEach(function(data) {
									
									var objVal = data.val();
									numTotalRating = numTotalRating + objVal.rating;
									numCount++;
								});
								
								// Compute the and round the new average rating
								numAvgRating = Math.round(numTotalRating/numCount);
							});
							
							// Pushes the new review to the database
							objNewReview = objDbConnReviews.push();
							objNewReview.set({ 
								'name': strName, 
								'date': strDate,
								'rating': numRating, 
								'comments': strComment
							});
							
							// Updates the average rating in the database.
							objDbConnTrails = new Firebase(strTrailsUrl + strTrailName);
							objNewAvgRating = objDbConnTrails.update({
								'avg_rating': numAvgRating
							});
						}
					}
					catch(err) {
					   
						console.log( "Error: Review submission - " + err );
						alert( "An error occurred while submitting the review" );
					} 
					finally {
					   
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
			    	width: 565,
			    	open: function() {
			    		$('.leaflet-control-container').addClass('ui-widget-overlay');
			    	},
			    	close: function() {
			    		$( '.leaflet-control-container' ).removeClass( 'ui-widget-overlay' );
			    		
			    		// Resets the name and comments section
			    		$( '#reviewer-name' ).val('');
						$( '#reviewer-comments' ).val('');
			    		
			    		// Resets the rating stars
			    		$( ".rating-star" ).addClass( "empty-star" ).removeClass( "full-star" );
			    		objGlobalVars.numRating = 0;
			    	}
			    })
			}
			
			// Displays the dialog
			this.dialog.dialog( 'open' );
		}
	}
}();