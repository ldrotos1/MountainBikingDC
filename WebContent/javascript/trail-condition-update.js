/**
 * Louis Drotos
 * Jan 17, 2015
 * 
 * This module provides a namespace for code that handles
 * the trail condition update functionality.
 */

nsCondUpdate = function(){
	
	this.dialog = undefined;
	
	return {
		
		/**
		 * Opens the update condition dialog and updates the trail
		 * condition in the database when the user submits an update.
		 * @param strTrailsUrl { string } The URL to the trails information database. 
		 */
		showCondUpdate: function( strTrailsUrl ) {
			
			var self = this;
			
			if ( this.dialog === undefined ) {
				
				// Initializes the update trail condition button
				$( '#btn-submit-cond-update' ).button().on( 'click', function(evt) {
					
					var strTrailName,
					strDate,
					strCond;
					
					// Gets the trail name and removes any spaces
					strTrailName = $( '#trail-name' ).text();
					strTrailName = strTrailName.replace(/ +/g, "");
					
					// Gets the new condition and the current date
					strCond = $( "input:radio[name=condition]:checked" ).val();
					strDate = moment().format('DD MMM YYYY');
					
					// Updates the database
					objDbConn = new Firebase( strTrailsUrl + strTrailName );
					objDbConn.update({
						condition: strCond, 
						condition_date: strDate
					});
					
					// Closes dialog
					self.dialog.dialog( 'close' );
				})
				
				// Initializes the update trail condition dialog
				this.dialog = $( '#update-cond-form' ).dialog({
					autoOpen: false,
			    	modal: true,
			    	resizable: false,
			    	title: 'Update Trail Condition',
			    	width: 275,
			    	open: function() {
			    		
			    		// Applies the modal overlay to the sidebar
			    		$('.leaflet-control-container').addClass('ui-widget-overlay');
			    		
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
			    	},
			    	close: function() {
			    		
			    		// Removes the modal overlay from the sidebar
			    		$( '.leaflet-control-container' ).removeClass( 'ui-widget-overlay' );
			    	}
				});
			}
			
			this.dialog.dialog( 'open' );
		}
	}
}();