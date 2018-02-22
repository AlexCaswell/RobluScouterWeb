/*********************************************

Contains utility functions used throughout app

*********************************************/




//translates autoCheckoutMode setting from number to title
function getAutoCheckoutModeString(ac_mode) {
	switch(ac_mode) {
		case 0: return null;
		case 1: return "Red Device 1";
		case 2: return "Red Device 2";
		case 3: return "Red Device 3";
		case 4: return "Blue Device 1";
		case 5: return "Blue Device 2";
		case 6: return "Blue device 3";
		case 7: return "Pit";
		default: return null;
	}
}