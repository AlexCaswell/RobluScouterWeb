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