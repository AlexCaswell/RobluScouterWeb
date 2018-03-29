/****

Settings storage functions

****/

	function saveUsername() {
		setItem("username", $("#username input").val());
	}

	function saveServerIp() {
		setItem("serverIp", $("#server_ip input").val());
	}

	function saveTeamCode() {
		setItem("teamCode", $("#team_code input").val());
		if(getItem("serverIp", false) !== "") {
			var eurl = "http://" + getItem("serverIp", false) + "/teams/getTeam?code=" + getItem("teamCode", false);
			$.ajax({
				type: 'POST',
				url: 'request.php',
				data: { url: eurl, post: false, params: null }
			}).done( function ( data ) {
				if(JSON.parse(data).status == "success") {
					Materialize.toast("Successfully joined team", 2500);
				}else {
					Materialize.toast("Unable to join team", 2500);
				}
			});
		}
	}

	function saveAcMode() {
		var ac_mode_num;
		if ($("#ac_dis").is(':checked')) {
			ac_mode_num = 0;
		}
		if ($("#ac_pit").is(':checked')) {
			ac_mode_num = 7;
		}
		if ($("#ac_rd1").is(':checked')) {
			ac_mode_num = 1;
		}
		if ($("#ac_rd2").is(':checked')) {
			ac_mode_num = 2;
		}
		if ($("#ac_rd3").is(':checked')) {
			ac_mode_num = 3;
		}
		if ($("#ac_bd1").is(':checked')) {
			ac_mode_num = 4;
		}
		if ($("#ac_bd2").is(':checked')) {
			ac_mode_num = 5;
		}
		if ($("#ac_bd3").is(':checked')) {
			ac_mode_num = 6;
		}
		setItem("autoCheckoutMode", ac_mode_num);
		autoCheckout(); //from view_page_functions.js
	}

	function loadCurrentSettings() {
		//load username
		$("#username input").val(getItem("username", false));
		//load serverIp
		$("#server_ip input").val(getItem("serverIp", false));
		//load teamCode
		$("#team_code input").val(getItem("teamCode", false));

		//load autoCheckoutMode
		if(getItem("autoCheckoutMode", false) == 0) {
				$("#ac_dis").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 7) {
				$("#ac_pit").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 1) {
				$("#ac_rd1").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 2) {
				$("#ac_rd2").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 3) {
				$("#ac_rd3").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 4) {
				$("#ac_bd1").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 5) {
				$("#ac_bd2").prop("checked", true);
		}
		if(getItem("autoCheckoutMode", false) == 6) {
				$("#ac_bd3").prop("checked", true);
		}

	}