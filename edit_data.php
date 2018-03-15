<!DOCTYPE html>
<html>
<head>
	<title>Roblu Scouter - Web Interface | Edit Data</title>

	<!-- Materilize -->
	<!--Import Google Icon Font-->
  	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<!--Import materialize.css-->
	<link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css"  media="screen,projection"/>


  	<!--Let browser know website is optimized for mobile-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

 	<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
</head>
<body>
 	<nav class="nav-extended" style="position: fixed; top: 0; left: 0; z-index: 1000;">
 		<div class="nav-wrapper">
      		<a id="back" href="index.html"><i class="material-icons" style="display: inline-block; z-index: 50px; margin-left: 10px; vertical-align: center;">arrow_back</i></a><a id="team_name" style="font-size: 1.6rem; margin-left: 35px;" class="brand-logo left"><br></a>
      		<a href="#" id="team_number" style="font-size: 1.1rem; margin-top: -20px; padding: 0 0 15px 55px; display: block; line-height: 1.1rem;"><br></a>
      		<!-- settings button and menu -->
			<a href="#" id="settings_button" data-activates='settings_list' onclick="setWonOptions();" class="dropdown-button" style="position: absolute; top: 10px; right: 30px;"><i class="material-icons">settings</i></a>
      		<ul style="margin-top: 20px; margin-right: 30px; min-width: 250px;" id="settings_list" class="dropdown-content">
      			<li id="mark_won"></li>
      		</ul>
      		<style type="text/css">#settings_list li a { color: #FFF; }</style>
  		</div>

  		<!-- tab selector -->
	    <div class="nav-content">
	    	<div id="st"></div>
	      <ul class="tabs tabs-transparent" id="tab_selectors">

	      </ul>
	    </div>
 	</nav><br><br><br><br><br><br><br>
 	<div style="margin: 0 3% 0 3%;" id="tabs">
 		
 	</div>

<!-- Ui initializations -->
<script type="text/javascript">


	$(document).ready(function() {

		// set Ui colors
		var primaryColor = "#3F51B5";
		var cardColor = "#444444";
		var backgroundColor = "#303030";

		$(".card").attr("style", "background: " + cardColor + " !important;");
		$("#settings_list").css("background", cardColor);
		$("nav").attr("style", $("nav").attr("style") + " background: " + primaryColor + " !important;");
		$("body").attr("style", "background: " + backgroundColor + " !important;");
		
		//initialize settings dropdown
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

		//Load checkout object
		var checkout_content = JSON.parse(JSON.parse(<?php echo $_POST['checkout']; ?>).content);

		//get wheather checked out
		var checked_out = '<?php echo $_POST['checked_out']; ?>';

		//set return tab
		if(checked_out == "true") { $("#back").attr("href", "index.html?tab=myCheckouts"); }

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
		if(checked_out == 'true') { $("#settings_button").attr("style", $("#settings_button").attr("style") + "pointer-events: auto;"); }
		else { $("#settings_button").attr("style", $("#settings_button").attr("style") + "pointer-events: none;"); }

		//load tabs with metrics
		for(var i = 0; i < checkout_content.team.tabs.length; i++) {

			//Add tab button
			var tab_title;
			if(checkout_content.team.tabs[i].matchType == "PIT" || checkout_content.team.tabs[i].matchType == "PREDICTIONS") {
				tab_title = checkout_content.team.tabs[i].matchType; // only show matchType if tab is of type pit or predictions

				//limit won editability
				$("#settings_button").attr("style", $("#settings_button").attr("style") + "pointer-events: none;");
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
		updateAllianceColor(checkout_content.team.tabs[0].redAlliance);

	});



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
			$("#mark_won").html("<a>Mark as lost</a>");
		} else {
			$("#mark_won").attr("onclick", "setWon(true);");
			$("#mark_won").html("<a>Mark as won</a>");
		}
	}

	//saves tab metrics locally
	function saveTabs() {

		var checkout = JSON.parse(<?php echo $_POST['checkout']; ?>);
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
		var myCheckouts = JSON.parse(localStorage.getItem("myCheckouts"));
		//find editing checkout
		for(var k = 0; k < myCheckouts.length; k++) {
			if(myCheckouts[k].id == checkout.id) {
				myCheckouts[k].content = JSON.stringify(checkout_content);
			}
		}

		localStorage.setItem("myCheckouts", JSON.stringify(myCheckouts));

	}


	//makes the proper metric request
	function metricRequest(tab_id, metric, checked_out, cardColor, callback) {
		//RBoolean
		if(metric.type == "RBoolean") {
			$.ajax({
				type: 'POST',
				url: "cards/metrics/" + metric.type + ".php",
				data: {
					checked_out: checked_out,
					metric: JSON.stringify(metric),
					modified: metric.modified,
					required: metric.required,
					title: metric.title,
					value: metric.value,
					id: tab_id + metric.id,
					cardColor: cardColor
				}
			}).done(function ( data ) {
				callback(data);
			});
		}
		//RTextfield
		else if(metric.type == "RTextfield") {
			$.ajax({
				type: 'POST',
				url: "cards/metrics/" + metric.type + ".php",
				data: {
					checked_out: checked_out,
					metric: JSON.stringify(metric),
					modified: metric.modified,
					title: metric.title,
					text: metric.text,
					id: tab_id + metric.id,
					oneLine: metric.oneLine,
					// numericalOnly: metric.numericalOnly, (not currently supported)
					cardColor: cardColor	
				}
			}).done(function ( data ) {
				callback(data);
			});
		}
		//RCounter
		else if(metric.type == "RCounter") {
			$.ajax({
				type: 'POST',
				url: "cards/metrics/" + metric.type + ".php",
				data: {
					checked_out: checked_out,
					metric: JSON.stringify(metric),
					modified: metric.modified,
					title: metric.title,
					id: tab_id + metric.id,
					value: metric.value,
					cardColor: cardColor
				}
			}).done(function ( data ) {
				callback(data);
			});
		}
		//RDivider
		else if(metric.type == "RDivider") {
			$.ajax({
				type: 'POST',
				url: "cards/metrics/" + metric.type + ".php",
				data: {
					metric: JSON.stringify(metric),
					id: tab_id + metric.id,
					title: metric.title,
					cardColor: cardColor
				}
			}).done(function ( data ) {
				callback(data);
			});
		}
		//RMetric
		else {
			$.ajax({
				type: 'POST',
				url: "cards/metrics/RMetric.php",
				data: {
					metric: JSON.stringify(metric),
					type: metric.type,
					title: metric.title,
					id: tab_id + metric.id,
					cardColor: cardColor
				}
			}).done(function ( data ) {
				callback(data);
			});
		}
	}

	//changes nav bar color
	function updateAllianceColor(redAlliance) {
		if(redAlliance) {
			$("nav").attr("style", $("nav").attr("style") + " background: " + "#D32F2F" + " !important;");
		} else {
			$("nav").attr("style", $("nav").attr("style") + " background: " + "#3F51B5" + " !important;");
		}
		
"#D32F2F"
	} 



</script>

<!--Import jQuery before materialize.js-->
<script type="text/javascript" src="materialize/js/materialize.min.js"></script>
 <!-- import metric_update_functions.js -->
<script type="text/javascript" src="js/metric_update_functions.js"></script>
</body>

</html>