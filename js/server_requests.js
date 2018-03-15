/******************************************

server request functions
(uses Jquery)

*******************************************/



/***********************************
SERVER REQUEST FUNCTIONS

NOTE:
Each of these functions assume that the server inforamtion has already stored in localStorage items
************************************/

// return the response (in JS object) of the "getTeam" server request.
function getTeamModel(callback) {
	$.ajax({
		type: 'GET',
		url: "http://" + localStorage.getItem("serverIp") + "/teams/getTeam",
		data: { code: localStorage.getItem("teamCode") }
	}).done( function ( data ) {
		callback(data.data);
	});
}




// returns array of all checkouts filtered by options
function getCheckouts(showPitCheckouts, showCompletedCheckouts, showCheckedOut, deviceRole, callback) {
	$.ajax({
		type: 'GET',
		url: "http://" + localStorage.getItem("serverIp") + "/checkouts/pullCheckouts",
		data: { code: localStorage.getItem("teamCode"), pullAll: true }
	}).done( function ( data ) {

	    // filter checkouts by device role
	    var sorted_checkouts_d = [];
	  	var index = 0;

	  	if(deviceRole != 0) {
	    	for(var i = 0; i < data.data.length; i++) {
	    		var checkout = JSON.parse(data.data[i].content);

	    		// Pit role
		    	if(checkout.team.tabs[0].matchType == "PIT" && deviceRole != 7) { continue; }
		    	// Blue 3 role
		    	if(checkout.team.tabs[0].alliancePosition == 6 && deviceRole != 6) { continue; }
		    	// Blue 2 role
		    	if(checkout.team.tabs[0].alliancePosition == 5 && deviceRole != 5) { continue; }
		    	// Blue 1 role
		    	if(checkout.team.tabs[0].alliancePosition == 4 && deviceRole != 4) { continue; }
		    	// Red 3 role
		    	if(checkout.team.tabs[0].alliancePosition == 3 && deviceRole != 3) { continue; }
		    	// Red 2 role
		    	if(checkout.team.tabs[0].alliancePosition == 2 && deviceRole != 2) { continue; }
		    	// Red 1 role
		    	if(checkout.team.tabs[0].alliancePosition == 1 && deviceRole != 1) { continue; }

	    		sorted_checkouts_d[index] = data.data[i];
	    		index++;
			}
		}else {
			sorted_checkouts_d = data.data; // if device role is 0 no filtering is needed.
		}


		// filter remaining checkouts based on "checkbox variables"
		var sorted_checkouts_dc = [];
		index = 0;

	    for (var i = 0; i < sorted_checkouts_d.length; i++) {
	    	var checkout = sorted_checkouts_d[i];
	    	var checkout_content = JSON.parse(sorted_checkouts_d[i].content);

	    	// Filter pit checkouts
	    	if(!showPitCheckouts && checkout_content.team.tabs[0].matchType == "PIT") { continue; }
	    	// Filter comleted checkouts
	    	if(!showCompletedCheckouts && checkout.status == 2) { continue; }
	    	// Filter checked out
	    	if(!showCheckedOut && checkout.status == 1) { continue; }

    		sorted_checkouts_dc[index] = checkout;
    		index++;
	    }


   		//return sorted checkouts
   		callback(sorted_checkouts_dc);

	});
}


// uploads array of checkout-model objects
function pushCheckouts(checkouts) {
	$.ajax({
		type: 'POST',
		url: "http://" + localStorage.getItem("serverIp") + "/checkouts/pushCheckouts",
		data: { code: localStorage.getItem("teamCode"), content: JSON.stringify(checkouts) }
	}).done( function (data) {
		console.log(data);
	});
}

