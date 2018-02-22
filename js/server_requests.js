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
				data: { code: code, time: Date.now() }
			}).done( function ( data ) {

				// sort checkouts based on "checkbox variables"
				var sorted_checkouts_c;
				var index = 0;

				console.log(JSON.stringify(data.data));

			    // for (var i = 0; i < data.data.length; i++) {
			    // 	var checkout = data.data[i];

			    // 	// Show pit checkouts
			    // 	if(showPitCheckouts && checkout.team.tabs[0].matchType == "PIT") {
			    // 		sorted_checkouts_c[index] = checkout;
			    // 		index++;
			    // 	}
			    // 	// Show comleted checkouts
			    // 	if(showCompletedCheckouts && checkout.status == 2) {
			    // 		sorted_checkouts_c[index] = checkout;
			    // 		index++;
			    // 	}
			    // 	// Show checked out
			    // 	if(showCheckedOut && checkout.status == 1) {
			    // 		sorted_checkouts_c[index] = checkout;
			    // 		index++;
			    // 	}
			    // }

			    // // sort remaining checkouts by device role
			    // var sorted_checkouts_cd;
			    // index = 0;

			    // if(deviceRole != 0) {
			    // 	for(var i = 0; i < sorted_checkouts_c.length; i++) {
			    // 		var checkout = sorted_checkouts_c[i];

			    // 		// Pit role
				   //  	if(checkout.team.tabs[0].matchType == "PIT" && deviceRole == 7) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
				   //  	// Blue 3 role
				   //  	if(checkout.team.tabs[0].alliancePosition == 6 && deviceRole == 6) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
				   //  	// Blue 2 role
				   //  	if(checkout.team.tabs[0].alliancePosition == 5 && deviceRole == 5) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
				   //  	// Blue 1 role
				   //  	if(checkout.team.tabs[0].alliancePosition == 4 && deviceRole == 4) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
				   //  	// Red 3 role
				   //  	if(checkout.team.tabs[0].alliancePosition == 3 && deviceRole == 3) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
				   //  	// Red 2 role
				   //  	if(checkout.team.tabs[0].alliancePosition == 2 && deviceRole == 2) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
				   //  	// Red 1 role
				   //  	if(checkout.team.tabs[0].alliancePosition == 1 && deviceRole == 1) {
				   //  		sorted_checkouts_cd[index] = checkout;
				   //  		index++;
				   //  	}
			   	// 	}

			   	// 	//return sorted checkouts
			   	// 	callback(sorted_checkouts_cd);

			    // }

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