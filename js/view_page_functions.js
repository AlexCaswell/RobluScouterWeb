/******************************************

view page functions
(depends on Jquery) (conains functions used only to control the view page html)


functions:

load()
loadCheckouts()
filterCheckouts()
autoCheckout()
completeCheckout()
uploadMyCheckouts()
openCheckout()
checkout()
loadMyCheckouts()
getAutoCheckoutModeString()
getCheckoutById()
get_checkout()

*******************************************/



//retreives all checkouts from server and stores in global CHECKOUTS object
function load() {
	$("#active_event_label").html("<br>");
	//set loading view
	$("#lev_text").text("Loading checkouts from server...");
	$("#loading_event_page").fadeIn(50);

	//pull checkouts from server
	pullCheckouts( function( data ) {
		if(data.status == "success") {
			CHECKOUTS = data.data;
			setTimeout(function () {
				//load first 30 checkotus into page
				loadCheckouts(0, 30, function () {
					$("#loading_event_page").fadeOut(200);
					// Set active event name from server
					getTeamModel( function(team_data) {
						$("#active_event_label").html(team_data.active_event_name + " - <a href='#' style='text-decoration: underline;'onclick='load();'>Reload</a>");
						autoCheckout();
						fillPage();
					});
				});
			}, 30);
		}else {
			$("#lev_text").text("Unable to pull checkouts");
		}
	});
}



// loads specified range of checkouts from global CHECKOUTS object into checkouts div
function loadCheckouts(start, limit, callback) {

	//update global varible
	CHECKOUTS_LOADED = limit;

	//Clear checkouts div if rage starts at 0
	if(start == 0) {
		$("#checkouts").html("");
	}

	if(limit > CHECKOUTS.length) { limit = CHECKOUTS.length }

	//load all checkouts into checkouts div
	for(var i = start; i < limit; i++) {

		var checkout = CHECKOUTS[i];
		var checkout_content = JSON.parse(CHECKOUTS[i].content);

		var status;
		if(checkout_content.status == 0 || checkout_content.status == -1) {
			status = "Available";
		}
		if (checkout_content.status == 1) {
			status = "Checked out to " + checkout_content.nameTag;
		}
		if (checkout_content.status == 2) {
			status = "Completed"
		}
		var params = {
			team: checkout_content.team.name,
			number: checkout_content.team.number,
			type: checkout_content.team.tabs[0].matchType,
			match_order: checkout_content.team.tabs[0].matchOrder,
			cardColor: cardColor,
			available: status,
			onclick: "openCheckout(" + checkout.id + ", false);",
			checked_out: false,
			id: checkout.id
		};
		$("#checkouts").html($("#checkouts").html() + get_checkout(params));

	}
	filterCheckouts();
	callback("finished");

}


//sets visibility of checkouts based on checkbox varibles
function filterCheckouts() {

	//Get settings from checkboxes
	var show_pit_checkouts = $("#show_pit_checkouts").is(':checked');
	var show_completed_checkouts = $("#show_completed_checkouts").is(':checked');
	var show_checked_out = $("#show_checked_out").is(':checked');

	var checkout_elements = $("#checkouts").children();
	for(var i = 0; i < checkout_elements.length; i++) {

		var checkout_id = $(checkout_elements[i]).attr("id");
		var checkout_content = JSON.parse(getCheckoutById(checkout_id).checkout.content);
		var valid = true;
		if(checkout_content.team.tabs[0].matchType == "PIT" && !show_pit_checkouts) valid = false;
		if(checkout_content.status == 2 && !show_completed_checkouts) valid = false;
		if(checkout_content.status == 1 && !show_checked_out) valid = false;

		//hide/show element based on valid
		if(!valid) {
			$(checkout_elements[i]).hide();
		}else {
			$(checkout_elements[i]).show();
		}
	}
}

//adds all checkouts with the matching device role to myCheckouts item (must be run after checkouts are loaded into storage item)
function autoCheckout() {
	if(getItem("autoCheckoutModeTemp", false) != getItem("autoCheckoutMode", false)) {

		//remove old device role checkouts and change status' to 0
		// release status'
		uploadMyCheckouts(true);
		// remove item
		removeItem("myCheckouts");
		setItem("autoCheckoutModeTemp", getItem("autoCheckoutMode", false));

		if(getItem("autoCheckoutMode", false) != '0') {
		
			var deviceRole = parseInt(getItem("autoCheckoutMode", false));
	    	var myCheckouts = JSON.parse(getItem("myCheckouts", true));

			//add all checkouts that have matching deviceRole and that are not already checked out			
	    	for(var i = 0; i < CHECKOUTS.length; i++) {
	    		var checkout = JSON.parse(CHECKOUTS[i].content);
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

		    	//check uniqueness
		    	var unique = true;
		    	for(var j = 0; j < myCheckouts.length; j++) {
		    		if(myCheckouts[j].id == checkout.id) unique = false;
		    	}
		    	if(!unique) continue;

		    	//change status/nameTag and add to myCheckouts
		    	checkout.nameTag = getItem("username", false);
		    	checkout.status = 1;
		    	CHECKOUTS[i].content = JSON.stringify(checkout);
	    		myCheckouts[myCheckouts.length] = CHECKOUTS[i];
			}
			//store myCheckouts
			setItem("myCheckouts", JSON.stringify(myCheckouts));

			//update server status'
			uploadMyCheckouts(false);
		}
		//refresh view
		updateTitle();
		loadMyCheckouts(0, 30);
	}
}

//upload a single checkout with status 2
function completeCheckout(id) {

	//remove element
	$("#my_checkouts").find("#" + id).css("display", "none");

	//find checkout
	var myCheckouts = JSON.parse(getItem("myCheckouts", true));
	for(var i = 0; i < myCheckouts.length; i++) {
		if(id == myCheckouts[i].id) {

			var ck_content = JSON.parse(myCheckouts[i].content);
			ck_content.status = 2;
			myCheckouts[i].content = JSON.stringify(ck_content);
			Materialize.toast("Checkout completed.", 2500);
			pushCheckouts([myCheckouts[i]]);

			//remove from array
			myCheckouts.splice(i, 1);

			//save changes in local storage
			setItem("myCheckouts", JSON.stringify(myCheckouts));

			break;
		}
	}

}

//uploads all checkouts in myCheckouts
function uploadMyCheckouts(release) {
	var myCheckouts = JSON.parse(getItem("myCheckouts", true));
	if(release && myCheckouts.length != 0) {
		//change checkout status' to available
		for(var i = 0; i < myCheckouts.length; i++) {
			var ck_content = JSON.parse(myCheckouts[i].content);
			ck_content.status = 0;
			myCheckouts[i].content = JSON.stringify(ck_content);
		}
	}

	if(myCheckouts.length != 0) {
		pushCheckouts(myCheckouts);
	}
}


//opens checkout in edit view
function openCheckout(id, ck_out) {

	if(ck_out == true) {
		//get from local storage
		var myCheckouts = JSON.parse(getItem("myCheckouts", true));
		for(var i = 0; i < myCheckouts.length; i++) {
			if(myCheckouts[i].id == id) {
				var checkout = JSON.stringify(myCheckouts[i]);
			}
		}
	} else {
		var checkout = JSON.stringify(getCheckoutById(id).checkout);
	}
	setItem("editing_checkout", JSON.stringify([checkout, ck_out]));

	loadEditPage(); //from edit_page_functions.js
	changePage('edit');
}

//adds checkout to myCheckouts local storage item
function checkout(id) {

	//load myCheckouts array
	var myCheckouts = JSON.parse(getItem("myCheckouts", true));

	//get checkout to checkout
	var myCheckout = getCheckoutById(id).checkout;

	//make sure checkout is not already checked out
	var available = false;
	var unique = false;
	var j = 0;
	do {
		if(myCheckouts.length == 0) {
			unique = true;
		}else if(myCheckout.id != myCheckouts[j].id) {
			unique = true;
		}else {
			unique = false; break;
		}
		j++;
	}while(j < myCheckouts.length);

	// if(!unique || myCheckout.status == 1 ||  myCheckout.status == 2) { available = false; } else { available = true; }
	if(!unique) { available = false; } else { available = true; }

	if (available) {
		//add checkout to array with updated status and name tag
		myCheckoutContent = JSON.parse(myCheckout.content);
		myCheckoutContent.nameTag = getItem("username", false);
		myCheckoutContent.status = 1;
		myCheckout.content = JSON.stringify(myCheckoutContent);
		myCheckouts[myCheckouts.length] = myCheckout;

		//serialize and store array
		setItem("myCheckouts", JSON.stringify(myCheckouts));

		//notify
		var myCheckout_content = JSON.parse(myCheckout.content);
		Materialize.toast(myCheckout_content.team.name + " " + myCheckout_content.team.tabs[0].matchType + " " + myCheckout_content.team.tabs[0].matchOrder + " has been checked out to " + getItem("username", false), 2500);
	}else {
		Materialize.toast("Already checked out", 2500);
	}

	uploadMyCheckouts(false);//sync status' with the server

}

//loads myCheckouts local storage item into my_checkouts div
function loadMyCheckouts(start, limit) {

	//update global varible
	MY_CHECKOUTS_LOADED = limit;

	//Clear my_checkouts div
	if(start == 0) {
		$("#my_checkouts").html("");
	}

	//load checkouts from myCheckouts local storage item into my_checkouts div
	var checkouts = JSON.parse(getItem("myCheckouts", true));
	if(limit > checkouts.length) { limit = checkouts.length; }
	for(var i = start; i < limit; i++) {

		var checkout = checkouts[i];
		var checkout_content = JSON.parse(checkouts[i].content);

		var status;
		if(checkout_content.status == 0 || checkout.status == -1) {
			status = "Available";
		}
		if (checkout_content.status == 1) {
			status = "Checked out to " + checkout_content.nameTag;
		}
		if (checkout_content.status == 2) {
			status = "Completed"
		}
		var params = {
			team: checkout_content.team.name,
			number: checkout_content.team.number,
			type: checkout_content.team.tabs[0].matchType,
			match_order: checkout_content.team.tabs[0].matchOrder,
			cardColor: cardColor,
			available: status,
			onclick: "openCheckout(" + checkout.id + ", true);",
			checked_out: true,
			id: checkout.id
		};
		$("#my_checkouts").html($("#my_checkouts").html() + get_checkout(params));
	}

}


//returns checkout html to the specifications of params
function get_checkout(params) {

if(params.type != "PIT") { var title = params.type + " " + params.match_order; } else { var title = "PIT"; } //checkout title
if(params.checked_out) { var icon = "cloud_upload"; } else { var icon = "add"; } //icon name
if(params.checked_out) { var ua_function = "completeCheckout(" + params.id + ");"; } else { var ua_function = "checkout(" + params.id + "); loadMyCheckouts(0, 30);"; } // upload/add function

return ' \
	<div class="card blue-grey darken-1" style="background: ' + params.cardColor + ' !important;" id="' + params.id + '"> \
		<div class="card-content white-text" onclick="' + params.onclick + '"> \
			<div> \
				<span style="color: #FFF;" class="card-title">' + params.number + " - " + params.team + '</span> \
				<p style="color: #FFF;">' + title + '</p> \
				<p style="color: #FFF;">' + params.available + '</p> \
			</div> \
		</div> \
		<a style="background: #2A2A2A; position: absolute; bottom: 10px; right: 10px;" onclick="' + ua_function + '" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">' + icon + ' \
		</i></a> \
	</div> \
';

}


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


//returns object with checkout object and found index of the specified id in the global CHECKOUTS variable
function getCheckoutById(id) {
	var checkout = [];
	var index = 0;
	for(var i = 0; i < CHECKOUTS.length; i++) {
		if(CHECKOUTS[i].id == id) {
			checkout = CHECKOUTS[i];
			index = i;
		}
	}
	return {checkout: checkout, index: index};
} 
