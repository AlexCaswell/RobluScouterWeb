//contains functions referenced by metric files used to update metric model on change
//depends on JQuery

//RBoolean
function update_boolean(id) {
	//get value of yes/no radio group
	if($("#true_" + id).is(":checked")) {
		var state = "true";
	} else {
		var state = "false";
	}

	var metric = JSON.parse($("#" + id).attr("metric"));
	metric.value = state;
	metric.modified = "true";
	$("#" + id).attr("metric", JSON.stringify(metric));
	$("#modified_" + id).attr("style", $("#modified_" + id).attr("style") + " visibility: hidden;");

	saveTabs();
}