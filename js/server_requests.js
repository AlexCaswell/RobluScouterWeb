/******************************************

server request functions
(uses Jquery)

*******************************************/



/***********************************
SERVER REQUEST FUNCTIONS

NOTE:
Each of these functions assume that the server inforamtion has already stored in localStorage items
and that the functions in storage_wrappers are available.
************************************/

// return the response (in JS object) of the "getTeam" server request.
function getTeamModel(callback) {
	$.ajax({
		type: 'GET',
		url: "http://" + getItem("serverIp", false) + "/teams/getTeam",
		data: { code: getItem("teamCode", false) }
	}).done( function ( data ) {
		callback(data.data);
	});
}


function getIsActive(callback) {
	$.ajax({
		type: 'GET',
		url: "http://" + getItem("serverIp", false) + "/teams/isActive",
		data: { code: getItem("teamCode", false) }
	}).done( function ( data ) {
		callback(data.data);
	});
}


// populates array of all checkouts filtered by options in localStorage item "checkouts"
function pullCheckouts(callback) {
	//get syncIDs
	var pullAll = false;
	var syncIDs = [];
	if(!pullAll && getItem("checkouts", true) !== "[]") {
		var checkouts = JSON.parse(getItem("checkouts", true));
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
		url: "http://" + getItem("serverIp", false) + "/checkouts/pullCheckouts",
		data: { code: getItem("teamCode", false), pullAll: pullAll, syncIDs: JSON.stringify(syncIDs) }
	}).done( function( data ) {
		if(data.status != "success") {
			Materialize.toast("ERROR: unable to pull checkouts from server", 2500);
		} else {
			//update local checkouts
			if(!pullAll) {
			var localCheckouts = JSON.parse(getItem("checkouts", true));
				for(var i = 0; i < data.data.length; i++) {
					var checkout = data.data[i];
					for(var j = 0; j < localCheckouts.length; j++) {
						if(localCheckouts[j].id == checkout.id) {
							localCheckouts[j] = checkout;
						}
					}
				}
				setItem("checkouts", JSON.stringify(localCheckouts));
			}else {
				setItem("checkouts", JSON.stringify(data.data));
			}
			console.log(data.data.length);
		}
		callback(data);
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
		url: "http://" + getItem("serverIp", false) + "/checkouts/pushCheckouts",
		data: { code: getItem("teamCode", false), content: JSON.stringify(checkouts) }
	}).done( function (data) {
		if(data.status !== "success") {
			Materialize.toast("ERROR: upload unsuccessful", 2500);
		}
	});
}

