/******************************************

server request and settings functions (depends on Jquery)

*******************************************/


const pathToPredefinedResponses = "predefined_json_responses/";


/***********************************
SERVER REQUEST FUNCTIONS
************************************/

// return the response (in JS object) of the "getTeam" server request.
function getTeamModel(callback) {
	getServerIp( function( ip ) {
		getTeamCode( function( code ) {
			$.ajax({
				type: 'GET',
				url: "http://" + ip + "/teams/getTeam",
				data: { code: code }
			}).done( function ( data ) {
				callback(data.data);
			});
		})
	});
}



// returns array of all checkouts filtered by options
function getCheckouts(showPitCheckouts, showCompletedCheckouts, showCheckedOut, deviceRole, callback) {
	getServerIp( function( ip ) {
		getTeamCode( function( code ) {
			$.ajax({
				type: 'GET',
				url: "http://" + ip + "/checkouts/pullCheckouts",
				data: { code: code, time: Math.round((new Date()).getTime() / 1000) }
			}).done( function ( data ) {

				// sort checkouts based on "checkbox variables"
				var sorted_checkouts_c = [];
				var index = 0;

			    for (var i = 0; i < data.data.length; i++) {
			    	var checkout = JSON.parse(data.data[i].content);
			    	// Show pit checkouts
			    	if(showPitCheckouts && checkout.team.tabs[0].matchType == "PIT") {
			    		sorted_checkouts_c[index] = checkout;
			    		index++;
			    	} else if(checkout.team.tabs[0].matchType == "PIT") { continue; }
			    	// Show comleted checkouts
			    	if(showCompletedCheckouts && checkout.status == 2) {
			    		sorted_checkouts_c[index] = checkout;
			    		index++;
			    	} else if (checkout.status == 2) { continue; }
			    	// Show checked out
			    	if(showCheckedOut && checkout.status == 1) {
			    		sorted_checkouts_c[index] = checkout;
			    		index++;
			    	}
			    }
			    // sort remaining checkouts by device role
			    var sorted_checkouts_cd = [];
			    index = 0;

			    if(deviceRole != 0) {
			    	for(var i = 0; i < sorted_checkouts_c.length; i++) {
			    		var checkout = sorted_checkouts_c[i];

			    		// Pit role
				    	if(checkout.team.tabs[0].matchType == "PIT" && deviceRole == 7) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 7) { continue; }
				    	// Blue 3 role
				    	if(checkout.team.tabs[0].alliancePosition == 6 && deviceRole == 6) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 6) { continue; }
				    	// Blue 2 role
				    	if(checkout.team.tabs[0].alliancePosition == 5 && deviceRole == 5) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 6) { continue; }
				    	// Blue 1 role
				    	if(checkout.team.tabs[0].alliancePosition == 4 && deviceRole == 4) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 6) { continue; }
				    	// Red 3 role
				    	if(checkout.team.tabs[0].alliancePosition == 3 && deviceRole == 3) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 6) { continue; }
				    	// Red 2 role
				    	if(checkout.team.tabs[0].alliancePosition == 2 && deviceRole == 2) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 6) { continue; }
				    	// Red 1 role
				    	if(checkout.team.tabs[0].alliancePosition == 1 && deviceRole == 1) {
				    		sorted_checkouts_cd[index] = checkout;
				    		index++;
				    	} else if (deviceRole == 7) { continue; }
			   		}

		   		//return sorted checkouts
		   		callback(sorted_checkouts_cd);

			    }
			    else {
			    	// No role
			    	callback(sorted_checkouts_c);
			    }

			});
		})
	});
}


// uploads array of checkout model objects
function pushCheckouts(checkouts) {

}



/************************************
SETTINGS FUCNTIONS
************************************/

// returns team code from localStorage
function getTeamCode(callback) {
	$.getJSON("../default_settings.json", function(json) {
		callback(json.teamCode);
	});
}

// sets team code in localStorage
function setTeamCode() {

}


// username
function getUsername() {

}

function setUsername() {

}


// server ip
function getServerIp(callback) {
	$.getJSON("../default_settings.json", function(json) {
		callback(json.serverIp);
	});
}

function setServerIp() {

}


// auto-chekout mode
function getAutoCheckoutMode(callback) {
	$.getJSON("../default_settings.json", function(json) {
		callback(json.autoCheckoutMode);
	});
}

function setAutoCheckoutMode() {

}