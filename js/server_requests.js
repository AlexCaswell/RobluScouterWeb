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
				url: "http://" + ip + "/teams/getTeam",
				data: { code: code }
			}).done( function ( data ) {
				callback(data);
			});
		})
	});
}


// returns JS object containing the contents of the "ui" object within the "Team model"
function getUiModel() {

}


// returns active_event_name string
function getActiveEventName() {

}


// returns array of all checkouts filtered by options
function getCheckouts(showPitCheckouts, showCompletedCheckouts, showCheckedOut) {

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
function getAutoCheckoutMode() {

}

function setAutoCheckoutMode() {

}