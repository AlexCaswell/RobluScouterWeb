/*********************************************

Contains utility functions used throughout app

*********************************************/




//translates autoCheckoutMode setting from number to title
function getAutoCheckoutModeString(ac_mode) {
	if (ac_mode == 0) { return null; }
	else if (ac_mode == 1) { return "Red Device 1"; }
	else if (ac_mode == 2) { return "Red Device 2"; }
	else if (ac_mode == 3) { return "Red Device 3"; }
	else if (ac_mode == 4) { return "Blue Device 1"; }
	else if (ac_mode == 5) { return "Blue Device 2"; }
	else if (ac_mode == 6) { return "Blue Device 3"; }
	else if (ac_mode == 7) { return "Pit"; }
	else { return null; }
}


//Checks if settings are set in localStorage. If they are not, set them to the defaults.
function loadDefaultsIfNeeded() {
	$.getJSON("../default_settings.json", function(json) {
		if (localStorage.getItem("username") === "undefined") { localStorage.setItem("username", json.username); }
		if (localStorage.getItem("serverIp") === "undefined") { localStorage.setItem("serverIp", json.serverIp); }
		if (localStorage.getItem("teamCode") === "undefined") { localStorage.setItem("teamCode", json.teamCode); }
		if (localStorage.getItem("autoCheckoutMode") === "undefined") { localStorage.setItem("autoCheckoutMode", json.autoCheckoutMode); }
	});
}