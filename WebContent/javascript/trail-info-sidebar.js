/**
 * Louis Drotos
 * Dec 26, 2015
 * 
 * This module provides a namespace for code that creates and
 * maintains the trail information sidebar.
 */

nsTrailInfo = function(){
	
	this.objSidebar = undefined;
	this.strReviewDB = undefined;
	this.strTrailsDB = undefined;
	this.objReviewConn = undefined;
	this.objTrailConn = undefined;
	
	/*
	 * Public functions
	 */
	return {

		/**
		 * Initializes the sidebar and adds it to a map
		 * @param objMap { object } The map to which the sidebar will be added.
		 * @param strDataUrl { string } The URL to the Firebase data store.
		 */
		initSidebar: function( objMap, strReviewsUrl, strTrailsUrl ) {
			
			var self = this;
			
			// Stores datastore URLs and creates DB connections
			this.strReviewDB = strReviewsUrl;
			this.strTrailsDB = strTrailsUrl;
			
			// Initializes the update trail condition button
			$( '#btn-update-condition' ).button().click(function( event ) {
				
			});
			
			// Initializes the submit trail review button
			$( '#btn-submit-review' ).button().click(function( event ) {
				nsTrailReviewForm.showReviewForm( self.strReviewDB, self.strTrailsDB );
			});
			
			// Creates sidebar and adds it to the map
			this.objSidebar = L.control.sidebar( 'trail-info-sidebar', {
				position: 'left'
			});
			
			// When sidebar is closed all callbacks connected to the database are removed
			this.objSidebar.on('hide', function(event) {
				this.objReviewConn.off();
				this.objTrailConn.off();
				this.objReviewConn = undefined;
				this.objTrailConn = undefined;
			});
			
			objMap.addControl( this.objSidebar );
		},
		
		/**
		 * Displays the trail info on the sidebar and ensures the sidebar
		 * is visible.
		 * @param objTrail { object } The trail object containing the trail
		 * information to be displayed.
		 */
		showTrailInfo: function( objTrail ) {
			
			if (this.objSidebar.isVisible() === true) {
				
				// Update sidebar content
				this._updateTrailInfo( objTrail );
				
			} else {
				
				// Update content and show sidebar
				this._updateTrailInfo( objTrail );
				
				// Adjusts trail review list height it needed
				if ( $( '#trail-reviews-list' ).innerHeight() < 1) {
					this._setTrailReviewsHeight();
				}
				
				// Shows the sidebar
				this.objSidebar.show();
			}
		},
		
		/**
		 * Updates the trail information on the sidebar's DOM
		 * @param objTrail { object } The trail object containing the trail
		 * information to be used to update the DOM
		 */
		_updateTrailInfo: function( objTrail ) {
			
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
			
			// Removes any previous callbacks from the database
			if ( this.objReviewConn !== undefined ) {
				this.objReviewConn.off();
			}
			
			if ( this.objTrailConn !== undefined ) {
				this.objTrailConn.off();
			} 
			
			// Wires callback to database to update average rating when database is updated
			this.objTrailConn = new Firebase(this.strTrailsDB + strTrailName);
			this.objTrailConn.on("child_changed", function(data) {
				
				$( '#trail-avg-rating' ).text( data.val() + " out of 5 Stars" );
			});
			
			// Gets the review data for this trail from the back end
			this.objReviewConn = new Firebase(this.strReviewDB + strTrailName);
			this.objReviewConn.on("value", function(data) {

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
		},
		
		/**
		 * Sets the height of the trails review list based on the 
		 * height of the browser
		 */
		_setTrailReviewsHeight: function() {
			
			var newHeight,
			sidebarHeight = $( '#trail-info-sidebar' ).outerHeight( ),
			infoHeight = $( '#trail-info' ).outerHeight( true ),
			curHeight = $( '#trail-reviews-list' ).outerHeight( true );
			
			newHeight = sidebarHeight - infoHeight - (1.75 * curHeight);
			$( '#trail-reviews-list' ).height( newHeight );	
		}	
	}
}();

