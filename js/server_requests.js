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


function getIsActive(callback) {
	$.ajax({
		type: 'GET',
		url: "http://" + localStorage.getItem("serverIp") + "/teams/isActive",
		data: { code: localStorage.getItem("teamCode") }
	}).done( function ( data ) {
		callback(data.data);
	});
}


// populates array of all checkouts filtered by options in localStorage item "checkouts"
function pullCheckouts() {

	//get syncIDs
	var pullAll = false;
	var syncIDs = [];
	if(!pullAll && localStorage.getItem("checkouts") !== null) {
		var checkouts = JSON.parse(localStorage.getItem("checkouts"));
		for(var i = 0; i < checkouts.length; i++) {
			syncIDs[i] = {
				checkoutID: checkouts[i].id,
				syncID: checkouts[i].sync_id
			};
		}
	} else {
		pullAll = true;
	}

	//request checkouts
	$.ajax({
		type: 'GET',
		url: "http://" + localStorage.getItem("serverIp") + "/checkouts/pullCheckouts",
		data: { code: localStorage.getItem("teamCode"), pullAll: pullAll, syncIDs: JSON.stringify(syncIDs) }
	}).done( function( data ) {
		if(data.status != "success") {
			Materialize.toast("ERROR: unable to pull checkouts from server", 2500);
		} else {
			localStorage.setItem("checkouts", JSON.stringify(data.data));
			console.log(data.data.length);
		}
	});
}


// uploads array of checkout-model objects
function pushCheckouts(checkouts) {
	//remove checkout meta-data
	for(var i = 0; i < checkouts.length; i++) {
		checkouts[i] = JSON.parse(checkouts[i].content);
	}
	$.ajax({
		type: 'POST',
		url: "http://" + localStorage.getItem("serverIp") + "/checkouts/pushCheckouts",
		data: { code: localStorage.getItem("teamCode"), content: JSON.stringify(checkouts) }
	}).done( function (data) {
		if(data.status !== "success") {
			Materialize.toast("ERROR: upload unsuccessful", 2500);
		}
	});
}

