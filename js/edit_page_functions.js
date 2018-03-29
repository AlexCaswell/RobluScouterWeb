//edit page functions



function loadEditPage() {
	//clear page
	$("#tab_selectors").html("");
	$("#tabs").html("");

	if(getItem("editing_checkout", true) !== '[]') {

		//Load checkout object
		var checkout_content = JSON.parse( JSON.parse( JSON.parse( getItem("editing_checkout", true) )[0] ).content );

		//get whether checked out
		var checked_out = JSON.parse(getItem("editing_checkout", true))[1];

		// Set team name and number
		//limit team name length
		var name_charr = checkout_content.team.name.split('');
		if(name_charr.length < 25) {
			var name = checkout_content.team.name;
		}else {
			for(var i = name_charr.length; i > 23; i--) {
				name_charr.pop();
			}
			var name = name_charr.join('') + "...";
		}

		$("#team_name").html(name);
		$("#team_number").html("#" + checkout_content.team.number);

		//limit won editability based on checked_out
		if(checked_out == true) { $("#edit_settings_button").attr("style", $("#edit_settings_button").attr("style") + "pointer-events: auto;"); }
		else { $("#edit_settings_button").attr("style", $("#edit_settings_button").attr("style") + "pointer-events: none;"); }

		//load tabs with metrics
		for(var i = 0; i < checkout_content.team.tabs.length; i++) {

			//Add tab button
			var tab_title;
			if(checkout_content.team.tabs[i].matchType == "PIT" || checkout_content.team.tabs[i].matchType == "PREDICTIONS") {
				tab_title = checkout_content.team.tabs[i].matchType; // only show matchType if tab is of type pit or predictions

				//limit won editability
				$("#edit_settings_button").attr("style", $("#edit_settings_button").attr("style") + "pointer-events: none;");
			} else {
				tab_title = checkout_content.team.tabs[i].matchType + " " + checkout_content.team.tabs[i].matchOrder; // include matchOrder
			}

			var won_label = "";
			if(checkout_content.team.tabs[i].won == true) { won_label = "<i style='font-size: 1.3em; display: inline;' class='material-icons'>star</i>"; }

			$("#tab_selectors").html($("#tab_selectors").html()
				+ "<li class='tab'><a href='#"
				+ checkout_content.team.tabs[i].matchType + "' id='ts_"
				+ checkout_content.team.tabs[i].matchType + "' won='"
				+ checkout_content.team.tabs[i].won + "' "
			    + "onclick='updateAllianceColor(" + checkout_content.team.tabs[i].redAlliance + ");'"
			    + "redAlliance='" + checkout_content.team.tabs[i].redAlliance + "' tab_title='" 
			    + tab_title + "'>"
				+ won_label + "  " + tab_title
				+ "</a></li>"
			);

			//Add tab content div
			$("#tabs").html($("#tabs").html()
				+ "<div class='col s12' id='"
				+ checkout_content.team.tabs[i].matchType 
				+ "'></div>"
			);

			//Populate tab with metrics
			loadMetrics(checkout_content.team.tabs[i], checkout_content.team.tabs[i].matchType, cardColor, checked_out);

		}

		// $("#tab_selectors").children().first().find('a').attr("class", "active");
		updateAllianceColor(checkout_content.team.tabs[0].redAlliance);

		setTimeout( function () { 
			$('#tab_selectors').tabs();
			// initialize settings dropdown
			$('.dropdown-button').dropdown({
				inDuration: 300,
				outDuration: 225,
				constrainWidth: false,
				hover: false,
				gutter: 0,
				belowOrigin: true,
				alignment: 'right',
				stopPropagation: false
			});
		}, 30);
	}

}



//place html string of metric cards for each metric in the tab into element with id
function loadMetrics(tab, id, cardColor, checked_out) {
	//request metrics
	for(var i = 0; i < tab.metrics.length; i++) {
		var metric = tab.metrics[i];
		metricRequest(tab.matchType, metric, checked_out, cardColor, function( data ) {
			$("#" + id).html($("#" + id).html() + data); //append metric
		});
	}
}

//adds or removes the star that indicates wheather a match was won.
function setWon(won) {
	var tab_id = $("#tab_selectors").find(".active").attr("id");
	if(won == true) {
		$("#" + tab_id).html("<i style='font-size: 1.3em; display: inline;' class='material-icons'>star</i>" + "  " + $("#" + tab_id).attr("tab_title"));
		$("#" + tab_id).attr("won", 'true');
	} else {
		$("#" + tab_id).html($("#" + tab_id).attr("tab_title"));
		$("#" + tab_id).attr("won", 'false');
	}

	saveTabs();
}

//adds correct options to settings dropdown
function setWonOptions() {
	if ($("#tab_selectors").find(".active").attr("won") == "true") {
		$("#mark_won").attr("onclick", "setWon(false);");
		$("#mark_won").html("<a style='color: #FFF;'>Mark as lost</a>");
	} else {
		$("#mark_won").attr("onclick", "setWon(true);");
		$("#mark_won").html("<a style='color: #FFF;'>Mark as won</a>");
	}
}

//saves tab metrics locally
function saveTabs() {

	var checkout = JSON.parse( JSON.parse( getItem("editing_checkout", true) )[0] );
	var checkout_content = JSON.parse(checkout.content);

	//update all tabs
	for(var i = 0; i < checkout_content.team.tabs.length; i++) {
		var tab_id = "#" + checkout_content.team.tabs[i].matchType;
		//update tab won
		if(!(tab_id == "#PIT" || tab_id == "#PREDICTIONS")) {
			checkout_content.team.tabs[i].won = ($("#ts_" + (checkout_content.team.tabs[i].matchType)).attr("won") == 'true');
		}

		//update metrics in tab
		for(var j = 0; j < checkout_content.team.tabs[i].metrics.length; j++) {	
			var metric_id = "#" + checkout_content.team.tabs[i].matchType + checkout_content.team.tabs[i].metrics[j].id;
			checkout_content.team.tabs[i].metrics[j] = JSON.parse($(tab_id).find(metric_id).attr("metric")); //updae metric from metric div value
		}
	}


	//save locally
	var myCheckouts = JSON.parse(getItem("myCheckouts", true));
	//find editing checkout
	for(var k = 0; k < myCheckouts.length; k++) {
		if(myCheckouts[k].id == checkout.id) {
			myCheckouts[k].content = JSON.stringify(checkout_content);

			//update editing_checkout in case of page refresh
			setItem("editing_checkout", JSON.stringify([JSON.stringify(myCheckouts[k]), true]));
		}
	}

	setItem("myCheckouts", JSON.stringify(myCheckouts));

}


//makes the proper metric request
function metricRequest(tab_id, metric, checked_out, cardColor, callback) {

	//RBoolean
	if(metric.type == "RBoolean") {
		var params = {
			checked_out: checked_out,
			metric: JSON.stringify(metric),
			modified: metric.modified,
			title: metric.title,
			value: metric.value,
			id: tab_id + metric.id,
			cardColor: cardColor
		};
		callback(get_boolean(params));
	}

	//RTextfield
	else if(metric.type == "RTextfield") {
		var params = {
			checked_out: checked_out,
			metric: JSON.stringify(metric),
			modified: metric.modified,
			title: metric.title,
			text: metric.text,
			id: tab_id + metric.id,
			oneLine: metric.oneLine,
			// numericalOnly: metric.numericalOnly, (not currently supported)
			cardColor: cardColor
		};
		callback(get_textfield(params));
	}

	//RCounter
	else if(metric.type == "RCounter") {
		var params = {
			checked_out: checked_out,
			metric: JSON.stringify(metric),
			modified: metric.modified,
			title: metric.title,
			id: tab_id + metric.id,
			value: metric.value,
			cardColor: cardColor
		};
		callback(get_counter(params));
	}

	//RCheckbox
	else if(metric.type == "RCheckbox") {
		var params = {
			checked_out: checked_out,
			metric: JSON.stringify(metric),
			modified: metric.modified,
			title: metric.title,
			id: tab_id + metric.id,
			values: metric.values,
			cardColor: cardColor
		};
		callback(get_checkbox(params));
	}

	//RSlider
	else if(metric.type == "RSlider") {
		var params = {
			checked_out: checked_out,
			metric: JSON.stringify(metric),
			modified: metric.modified,
			title: metric.title,
			id: tab_id + metric.id,
			max: metric.max,
			min: metric.min,
			value: metric.value,
			cardColor: cardColor
		};
		callback(get_slider(params));
	}

	//RChooser
	else if(metric.type == "RChooser") {
		var params = {
			checked_out: checked_out,
			metric: JSON.stringify(metric),
			modified: metric.modified,
			title: metric.title,
			id: tab_id + metric.id,
			values: metric.values,
			selectedIndex: metric.selectedIndex,
			cardColor: cardColor
		};
		callback(get_chooser(params));
	}

	//RDivider
	else if(metric.type == "RDivider") {
		var params = {
			metric: JSON.stringify(metric),
			id: tab_id + metric.id,
			title: metric.title,
			cardColor: cardColor
		};
		callback(get_divider(params));
	}

	//RMetric
	else {
		var params = {
			metric: JSON.stringify(metric),
			type: metric.type,
			title: metric.title,
			id: tab_id + metric.id,
			cardColor: cardColor
		};
		callback(get_metric(params));
	}
}

//changes nav bar color
function updateAllianceColor(redAlliance) {
	if(redAlliance) {
		$("#edit_nav").attr("style", $("nav").attr("style") + " background: " + "#D32F2F" + " !important;");
	} else {
		$("#edit_nav").attr("style", $("nav").attr("style") + " background: " + "#3F51B5" + " !important;");
	}
} 
