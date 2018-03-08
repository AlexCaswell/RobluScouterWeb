//contains functions referenced by metric files used to update metric model on change
//depends on JQuery

//RBoolean
function update_boolean(id) {
	//get value of yes/no radio group
	console.log(id);
	if($("#true_" + id).is(":checked")) {
		var state = "true";
	} else {
		var state = "false";
	}
	var metric = JSON.parse($("#" + id).attr("metric"));
	metric.value = state;
	metric.modified = "true";
	$("#" + id).attr("metric", JSON.stringify(metric));
	$("#modified_" + id).css("visibility", "hidden");

	saveTabs();
}


//RTextfield
function update_textfield(id) {
	var metric = JSON.parse($("#" + id).attr("metric"));
	metric.text = $("#text_" + id).val();
	metric.modified = "true";
	$("#" + id).attr("metric", JSON.stringify(metric));
	$("#modified_" + id).css("visibility", "hidden");

	saveTabs();
}

//RCounter
function update_counter(id, add) {
	var metric = JSON.parse($("#" + id).attr("metric"));
	var increment = metric.increment;
	metric.modified = "true";
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