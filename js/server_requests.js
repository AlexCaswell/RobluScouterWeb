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
	var eurl = "http://" + getItem("serverIp", false) + "/teams/getTeam?code=" + getItem("teamCode", false);
	$.ajax({
		type: 'POST',
		url: 'request.php',
		data: { url: eurl, post: false, params: null }
	}).done( function ( data ) {
		callback(JSON.parse(data).data);
	});
}


function getIsActive(callback) {
	var eurl = "http://" + getItem("serverIp", false) + "/teams/isActive?code=" + getItem("teamCode", false);
	$.ajax({
		type: 'POST',
		url: 'request.php',
		data: { url: eurl, post: false, params: null }
	}).done( function ( data ) {
		// callback(JSON.parse(data).data);
		callback(true);
	});
}

// populates array of all checkouts filtered by options in localStorage item "checkouts"
function pullCheckouts(callback) {

	//request checkouts
	// var eurl = "http://" + getItem("serverIp", false) + "/checkouts/pullCheckouts?code=" + getItem("teamCode", false) + "&pullAll=true";
	// $.ajax({
	// 	type: 'POST',
	// 	url: "request.php",
	// 	data: { url: eurl, post: false, params: null }
	// }).done( function( data ) {
	$.getJSON("checkout_request.json", function (data) {
		// data = JSON.parse(data);
		if(data.status != "success") {
			Materialize.toast("ERROR: unable to pull checkouts from server", 2500);
		}
		console.log(data.data.length);
		callback(data);
	});
}


// uploads array of checkout-model objects
function pushCheckouts(checkouts) {
	//remove checkout meta-data
	for(var i = 0; i < checkouts.length; i++) {
		checkouts[i] = JSON.parse(checkouts[i].content);
	}
	var eurl = "http://" + getItem("serverIp", false) + "/checkouts/pushCheckouts";
	var params = {"code": getItem("teamCode", false), "content": JSON.stringify(checkouts)};
	$.ajax({
		type: 'POST',
		url: "request.php",
		data: { post: true, url: eurl, params: JSON.stringify(params)  }
	}).done( function (data) {
		data = JSON.parse(data);
		if(data.status !== "success") {
			Materialize.toast("ERROR: upload unsuccessful", 2500);
		}
	});
}

