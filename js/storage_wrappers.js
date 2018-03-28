/******************************************

contains weapper functions for local storage methods
(uses Jquery)

*******************************************/


//gets localStorage item (returns empty value if not set).
function getItem(name, isArray) {
	verifyCompatibility()
	if(localStorage.getItem(name) !== null) {
		return localStorage.getItem(name); //return localStorage item
	} else {
		var item = new String; if(isArray) item = [];
		localStorage.setItem(name, JSON.stringify(item));
		return localStorage.getItem(name); //return empty value
	}
}


//sets localStorage item
function setItem(name, value) {
	verifyCompatibility()
	localStorage.setItem(name, value);
}


//removes localStorage item
function removeItem(name) {
	verifyCompatibility()
	localStorage.removeItem(name);
}


// Make sure browser is compatible with settings storage method
function verifyCompatibility() {
	if(typeof(Storage) === "undefined") {
		window.location.replace("../localsorage_error.html");
	}
}