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
		    		$( '#update-cond-form' ).hide();
		    	},
		    	create: function( event, ui ) {
		    		showTrailInfoDiv();
		    	}
		    });
			
			// Initializes the ratings spinner
			$( "#reviewer-rating" ).spinner({
				min:1,
				max:5
			});
			
			// Prevents user input
			$( "#reviewer-rating" ).bind("keydown", function (event) {
			    event.preventDefault();
			});
			
			// Initializes the trail update form
			$( '#update-cond-form' ).hide();
			
			$('#btn-update-cond').button();
			$('#btn-cancel-cond').button();
			
			// Wires events for the update trail button hover
			$( '#trail-cond-update' ).hover( 
					function( event ) {
						$(event.target).css('color', '#0B1C27').css('cursor', 'pointer');
					},
					function( event ) {
						$(event.target).css('color', '#245C83').css('cursor', 'default');
					}
			);
			
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
					$( '#review-dialog' ).fadeIn( 400 ).css( 'visibility', 'visible' );
			    });
				$( '#update-cond-form' ).hide();
				
				// Resizes the dialog
				$( "#trail-info-dialog" ).dialog( "option", { width: 340 } );
			});
			
			// Closes the dialog
			$( '#btn-info-close' ).button().click( function() {
				
				$( '#trail-info-dialog' ).dialog( 'close' );
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
				strRating = $( '#reviewer-rating' ).val();
				strComment = $( '#reviewer-comments' ).val();
				numRating = parseInt(strRating);
				
				if (strComment === '') {
					strComment = "No comments provided.";
				}
				
				// Validates inputs
				if (strName === '' || strRating === '') {
				
					alert("Please provide at least a name and a rating.");
				}
				else if (numRating < 1 || numRating > 5 || isNaN(numRating)){
					
					alert("The rating must be between 1 and 5.");
				}
				else {
					
					// Adds the review to the review list
					strDate = new Date().toJSON().slice( 0, 10 );
					strReviewDom = "<div class=\'middle-trail-review\'>";
					strReviewDom += "<span>" + strName + "</span><br>";
					strReviewDom += "<span>" + strDate + "</span><br>";
					strReviewDom += "<span>" + strRating + " out of 5</span><br>";
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
						'rating': strRating, 
						'comments': strComment
					});
				}
			});
			
			// Shows the station info DIV
			$( '#btn-review-cancel' ).button().click( function() {
				showTrailInfoDiv();
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
			
			$( '#trail-dist' ).text( 'Distance: ' + objTrail.distance + ' miles' );
			$( '#trail-difficulty' ).text( 'Difficulty: ' + objTrail.getDifficulty() );
			$( '#trail-condition' ).text( 'Trail Condition: ' + objTrail.condition + ' as of ' + objTrail.condDate );
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
					$( "#trail-reviews-list" ).prepend( strReviewDom );
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
	 * Accepts a trail condition value and updates the trail 
	 * condition in the DOM and on the datastore. 
	 * @param strCond {string} The trail condition; Good, Fair or Bad
	 */
	function updateTrailCond(strCond) {
		
		var strDate,
		strMessage,
		strTrailName,
		objDbConn;
		
		// Updates the DOM
		strDate = moment().format('DD MMM YYYY');
		strMessage = 'Trail Condition: ' + strCond + ' as of ' + strDate;
		$( '#trail-condition' ).text( strMessage );
		
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
			$( '#info-dialog' ).fadeIn( 400 );
	    });
		
		// Resizes the dialog
		$( "#trail-info-dialog" ).dialog( "option", { width: 500 } );
		
		// Clears submission form.
		$( '#reviewer-name' ).val( '' );
		$( '#reviewer-rating' ).val( '' );
		$( '#reviewer-comments' ).val( '' );
	}
}();