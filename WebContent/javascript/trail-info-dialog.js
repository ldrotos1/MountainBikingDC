/**
 * Louis Drotos
 * Sept 20, 2015
 * 
 * This module provides a namespace for code that creates 
 * and controls the trail information dialogs
 */

nsTrailInfoDialog = function(){
	
	/**
	 * Public functions
	 */
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
		    		$( '#update-cond-form' ).hide();
		    	},
		    	create: function( event, ui ) {
		    		showTrailInfoDiv();
		    	}
		    });
			
			// Initializes the trail update form
			$( '#update-cond-form' ).hide();
			
			$('#btn-update-cond').button();
			$('#btn-cancel-cond').button();
			
			// Wires events for the update trail button click
			$( '#trail-cond-update' ).button().click(function( event ){
				
				// Sets the radio button checked states
				var currentCond = $( '#trail-condition' ).text();
				$( "input:radio[name=condition]" ).prop('checked', false);
				
				if ( currentCond.includes('Good') === true){
					
					$( "input:radio[name=condition][value=Good]" ).prop('checked', true);
				}
				else if ( currentCond.includes('Fair') === true){
					
					$( "input:radio[name=condition][value=Fair]" ).prop('checked', true);
				}
				else if ( currentCond.includes('Bad') === true){
					
					$( "input:radio[name=condition][value=Bad]" ).prop('checked', true);
				}
				else{
					console.log("Error - Unknown trail condition value.");
				}
				
				// Shows the update trail condition section
				$( '#update-cond-form' ).toggle({
					effect: 'blind',
					duration: 400
				});
			});
			
			// Wires the trail condition update button click event handlers
			$( '#btn-update-cond' ).click(function(){
				
				var value = $( "input:radio[name=condition]:checked" ).val();
				updateTrailCond( value );
				
				$( '#update-cond-form' ).hide({
					effect: 'blind',
					duration: 400
				});
			});
			
			$( '#btn-cancel-cond' ).click(function(){

				$( '#update-cond-form' ).hide({
					effect: 'blind',
					duration: 400
				});
			});
			
			// Shows the review form
			$( '#btn-review-form' ).button().click( function() {
								
				// Switches the dialog content
				$( '#info-dialog' ).fadeOut( 400, function(){
					$('#trail-info-dialog').dialog('option', 'title', 'Submit Review');
					$( '#review-dialog' ).fadeIn( 400 ).css( 'visibility', 'visible' );
			    });
				$( '#update-cond-form' ).hide();
				
				// Resizes the dialog
				$( "#trail-info-dialog" ).dialog( "option", { width: 400 } );
				
				// Resets the trail rating
				resetRatingStars();
			});
			
			// Closes the dialog
			$( '#btn-info-close' ).button().click( function() {
				
				$( '#trail-info-dialog' ).dialog( 'close' );
				$('#trail-info-dialog').dialog('option', 'title', 'Trail Information');
				resetRatingStars();
			});
			
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
			
			// Submits the review
			$( '#btn-submit-review' ).button().click( function() {
				
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
					
					// Shows the station info DIV
					showTrailInfoDiv();
					
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
					
					// Resets rating value
					resetRatingStars();
				}
			});
			
			// Shows the station info DIV
			$( '#btn-review-cancel' ).button().click( function() {
				showTrailInfoDiv();
				resetRatingStars();
			});
		},
		
		/**
		 * Opens the trail information dialog for the specified trail.
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
			
			$( '#trail-dist' ).text( objTrail.distance + ' miles' );
			$( '#trail-difficulty' ).text( objTrail.getDifficulty() );
			$( '#trail-condition' ).text( objTrail.condition );
			$( '#cond-update-date').text(' as of ' + objTrail.condDate )
			$( '#trail-avg-rating' ).text( objTrail.getAverageRating() );
			
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
					strReviewDom += "<span>" + value.rating + " out of 5 Stars</span><br>";
					strReviewDom += "<p>" + value.comments + "</p>";
					strReviewDom += "</div>";
			
					// Adds the DOM
					$( "#trail-reviews-list" ).prepend( strReviewDom );
				});
				
				// Sets the DOM class for the first and last reviews
				$( '.middle-trail-review:first' ).addClass( 'first-trail-review' );
				$( '.middle-trail-review:last' ).removeClass( 'middle-trail-review' ).addClass( 'last-trail-review' );
			});
			
			// Shows the dialog
			$( '#trail-info-dialog' ).dialog( 'open' );
			
			// Resets the trail rating
			resetRatingStars();
		}
	}
	
	/**
	 * Accepts a trail condition value and updates the trail 
	 * condition in the DOM and on the datastore. 
	 * @param strCond {string} The trail condition; Good, Fair or Bad
	 */
	function updateTrailCond(strCond) {
		
		var strDate,
		strTrailName,
		objDbConn;
		
		// Updates the DOM
		strDate = moment().format('DD MMM YYYY');
		$( '#trail-condition' ).text( strCond );
		$( '#cond-update-date' ).text( ' as of ' + strDate );
		
		// Updates the trail object
		strTrailName = $( '#trail-name' ).text();
		$.each(objGlobalVars.arrTrails , function( index, value ){
			
			if(value.name === strTrailName){
				
				value.condition = strCond;
				value.condDate = strDate;
				
				// Updates the trail icon if trails are displayed by condition
				if (nsLegend.getCurrentLegend() === 'CONDITION'){
					value.symbCondition();
				}
				
				// Updates the back end datastore
				objDbConn = new Firebase('https://radiant-torch-5066.firebaseio.com/trails/' + strTrailName.replace(/ /g, ""));
				objDbConn.update({
					condition: strCond, 
					condition_date: strDate,
				});
			}
		});
	}
	
	/**
	 * Transitions from the review submission form DIV to the 
	 * trail info DIV on the trail information dialog
	 */
	function showTrailInfoDiv() {
		
		// Fades to trail info
		$( '#review-dialog' ).fadeOut( 400, function(){
			$('#trail-info-dialog').dialog('option', 'title', 'Trail Information');
			$( '#info-dialog' ).fadeIn( 400 );
	    });
		
		// Resizes the dialog
		$( "#trail-info-dialog" ).dialog( "option", { width: 500 } );
		
		// Clears submission form.
		$( '#reviewer-name' ).val( '' );
		$( '#reviewer-rating' ).val( '' );
		$( '#reviewer-comments' ).val( '' );
		
		// Resets the trail rating
		resetRatingStars();
	}
	
	/**
	 * Resets the rating stars so that they are empty
	 */
	function resetRatingStars(){
		objGlobalVars.numRating = 0;
		$( ".rating-star" ).addClass( "empty-star" ).removeClass( "full-star" );
	}
}();