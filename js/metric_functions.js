//contains functions referenced by metric elements used to update metric model on change and metric element loading functions
//depends on JQuery

/*
The following metrics are currently supported:
-RBoolaean
-RCounter
-RTextfield
-RDivider

any unsupported metrics should be requested as RMetrics


*/



/*****************************************
RBoolean
*****************************************/
function get_boolean(params) {

	if(params.checked_out == true) { var ck_out_value = "auto";	} else { var ck_out_value = "none";	} // pointer-events
	if(params.value == true) { var t_checked = "checked"; var f_checked = ""; } else { var t_checked = ""; var f_checked = "checked"; }  // checked
	if(params.modified == true) { var visibility = "hidden"; } else { var visibility = "visible"; }  // visibility
	

	return '\
		<div class="card blue-grey darken-1" style="background: ' + params.cardColor + ' !important;"> \
			<div class="card-content white-text"> \
				<div> \
					<span style="color: #FFF;" class="card-title">' + params.title + '</span> \
					<div style="pointer-events: ' + ck_out_value + '; position: absolute; top: 20%; right: 30px;" metric=\'' + params.metric + '\' id="' + params.id + '"> \
						<p> \
							<input onclick="update_boolean(\'' + params.id + '\')" name="tf_group_' + params.id + '" type="radio" id="true_' + params.id + '" ' + t_checked + '/> \
							<label style="color: #FFF;" for="true_' + params.id + '">Yes</label> \
						</p> \
						<p> \
							<input onclick="update_boolean(\'' + params.id + '\')" name="tf_group_' + params.id + '" type="radio" id="false_' + params.id + '" ' + f_checked + '/> \
							<label style="color: #FFF;" for="false_' + params.id + '">No</label> \
						</p> \
						<p  id="modified_' + params.id + '" style="font-size: 0.6em; color: #FFF; visibility: ' + visibility + ';">Not observed yet</p> \
						<br> \
					</div> \
					<style type="text/css"> \
			  			input[type="radio"]:checked + label:after { \
			  				background: #888; \
			  				border: #888; \
			  			} \
					</style> \
				</div> \
			</div> \
		</div> \
	';

}

function update_boolean(id) {
	//get value of yes/no radio group
	if($("#true_" + id).is(":checked")) {
		var state = true;
	} else {
		var state = false;
	}
	var metric = JSON.parse($("#" + id).attr("metric"));
	metric.value = state;
	metric.modified = true;
	$("#" + id).attr("metric", JSON.stringify(metric));
	$("#modified_" + id).css("visibility", "hidden");

	saveTabs();
}




/*****************************************
RTextfield
*****************************************/

function get_textfield(params) {

	if(params.checked_out == true) { var ck_out_value = "auto";	} else { var ck_out_value = "none";	} // pointer-events
	if(params.modified == true) { var visibility = "hidden"; } else { var visibility = "visible"; }  // visibility

	//choose correct element
	if(params.oneLine) {
	    var field_html = '\
		    <div class="input-field col s6"> \
	    		<input onkeyup="update_textfield(\'' + params.id + '\');" value="' + params.text + '" style="color: #FFF;" id="text_' + params.id + '" type="text" class="validate"> \
		    </div> \
			<style type="text/css"> \
			/* Change text input colors */ \
				 /* label color */ \
				.input-field label { \
					color: #CCC !important; \
				} \
				/* label focus color */ \
				.input-field input[type=text]:focus + label { \
					color: #FFF !important; \
				} \
				/* label underline focus color */ \
				.input-field input[type=text]:focus { \
					border-bottom: 1px solid #FFF !important; \
					box-shadow: 0 1px 0 0 #FFF !important; \
				} \
				/* valid color */ \
				.input-field input[type=text].valid { \
					border-bottom: 1px solid #FFF !important; \
					box-shadow: 0 1px 0 0 #FFF !important; \
				} \
				/* invalid color */ \
				.input-field input[type=text].invalid { \
					border-bottom: 1px solid #FFF !important; \
					box-shadow: 0 1px 0 0 #FFF !important; \
				} \
				/* icon prefix focus color */ \
				.input-field .prefix.active { \
					color: #FFF !important; \
				} \
			</style> \
		';
	} else {
		var field_html = '<div class="input-field col s6"> \
	    	<textarea onkeyup="update_textfield(\'' + params.id + '\');" id="text_' + params.id + '" class="materialize-textarea">' + params.text + '</textarea> \
	    </div> \
		<style type="text/css"> \
				/* label focus color */ \
		    .input-field input[type=text]:focus + label, .materialize-textarea:focus:not([readonly]) + label { \
		     	color: #FFF !important; \
		    } \
	\
			/* label underline focus color */ \
		    .input-field input[type=text]:focus, .materialize-textarea:focus:not([readonly]) { \
			    border-bottom: 1px solid #FFF !important; \
			    box-shadow: 0 1px 0 0 #FFF !important; \
		    } \
		</style>';
	}


	return '\
		<div class="card blue-grey darken-1" style="background: ' + params.cardColor + ' !important;"> \
			<div class="card-content white-text"> \
				<div> \
					<span style="color: #FFF;" class="card-title">' + params.title + '</span> \
					<div style="pointer-events: ' + ck_out_value + ';" metric=\'' + params.metric + '\' id="' + params.id + '"> \
						' + field_html + '\
						<p  id="modified_' + params.id + '" style="font-size: 0.6em; color: #FFF; visibility: ' + visibility + ';">Not observed yet</p> \
						<br> \
					</div> \
					<style type="text/css"> \
			  			input[type="radio"]:checked + label:after { \
			  				background: #888; \
			  				border: #888; \
			  			} \
					</style> \
				</div> \
			</div> \
		</div> \
	';
}


function update_textfield(id) {
	var metric = JSON.parse($("#" + id).attr("metric"));
	metric.text = $("#text_" + id).val();
	metric.modified = true;
	$("#" + id).attr("metric", JSON.stringify(metric));
	$("#modified_" + id).css("visibility", "hidden");

	saveTabs();
}





/*****************************************
RCounter
*****************************************/

function get_counter(params) {

	if(params.checked_out == true) { var ck_out_value = "auto";	} else { var ck_out_value = "none";	} // pointer-events
	if(params.modified == true) { var visibility = "hidden"; } else { var visibility = "visible"; }  // visibility

	return ' \
		<div class="card blue-grey darken-1" style="background: ' + params.cardColor + ' !important;"> \
			<div class="card-content white-text"> \
				<div> \
					<span style="color: #FFF;" class="card-title">' + params.title + '</span> \
					<div style="pointer-events: ' + ck_out_value + '; text-align: right; position: absolute; top: 20%; right: 30px;" metric=\'' + params.metric + '\' id="' + params.id + '"> \
						<ul class="counter_ul" style="margin: 12px 0 4px 0;"> \
							<li onclick="update_counter(\'' + params.id + '\', true)"  id="plus_' + params.id + '"><i class="material-icons">add</i></li> \
							<li id="counter_' + params.id + '">' + params.value + '</li> \
							<li onclick="update_counter(\'' + params.id + '\', false)" id="minus_' + params.id + '"><i class="material-icons">remove</i></li> \
						</ul> \
						<style> \
							.counter_ul li { \
								display: inline-block; \
								padding: 0 10px; \
								font-size: 1.6em; \
							} \
						</style> \
						<p  id="modified_' + params.id + '" style="font-size: 0.6em; color: #FFF; visibility: ' + visibility + ';">Not observed yet</p> \
						<br> \
					</div> \
					<style type="text/css"> \
			  			input[type="radio"]:checked + label:after { \
			  				background: #888; \
			  				border: #888; \
			  			} \
					</style> \
				</div> \
			</div> \
		</div> \
	';

}


function update_counter(id, add) {
	var metric = JSON.parse($("#" + id).attr("metric"));
	var increment = metric.increment;
	metric.modified = true;
	if(add == true) {
		var value = parseInt($("#counter_" + id).html()) + increment;
		$("#counter_" + id).html(value);
		metric.value = value;
	}else {
		var value = parseInt($("#counter_" + id).html()) - increment;
		$("#counter_" + id).html(value);
		metric.value = value;
	}
	$("#" + id).attr("metric", JSON.stringify(metric));
	$("#modified_" + id).css("visibility", "hidden");

	saveTabs();
}



/*****************************************
RDivider
*****************************************/

function get_divider(params) {

return ' \
	<div class="card blue-grey darken-1" style="background: ' + params.cardColor + ' !important;"> \
		<div class="card-content white-text" style="padding: 10px 0;"> \
			<div style="text-align: center;"> \
				<div style="margin: 0;" metric=\'' + params.metric + '\' id="' + params.id + '"> \
					<span style="color: #FFF; margin: 0; font-size: 1.9em;" class="card-title">' + params.title + '</span> \
				</div> \
			</div> \
		</div> \
	</div> \
';

}



/*****************************************
RMetric
*****************************************/

function get_metric(params) {

return ' \
	<div class="card blue-grey darken-1" style="background: ' + params.cardColor + ' !important;"> \
		<div class="card-content white-text"> \
			<div style="text-align: center;"> \
				<div metric=\'' + params.metric + '\' id="' + params.id + '"> \
					<p style="font-size: 0.9em; padding: 12px 0;">The ' + params.type + ', ' + params.title + ', is an unsupported metric.</p> \
				</div> \
			</div> \
		</div> \
	</div> \
';

}