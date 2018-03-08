<?php 

$team = $_POST['team'];
$type = $_POST['type'];
$available = $_POST['available'];
$card_color = $_POST['card_color'];
$checkout = $_POST['checkout'];
$onclick = $_POST['onclick'];
$checked_out = $_POST['checked_out'];
$id = $_POST['id'];
$match_order = $_POST['match_order'];
$last = $_POST['last'];
$limit = $_POST['limit'];
$start = $limit;

$limit = $limit + 30;

?>

<?php

	if($type != "PIT") {
		$type = $type." ".$match_order;
	}

	if($checked_out == 1) {
		$icon = "cloud_upload";
	}else {
		$icon = "add";
	}

	if($checked_out == 1) {
		$load_function = 'loadMyCheckouts('.$start.', '.$limit.'); $(".lm_mycheckouts").css("display", "none");';
		$lm_class = "lm_mycheckouts";
	} else {
		$load_function = 'loadCheckouts('.$start.', '.$limit.'); $(".lm_checkouts").css("display", "none");';
		$lm_class = "lm_checkouts";
	}

	$checkout = 
	'
		<div class="card blue-grey darken-1" style="background: '.$card_color.' !important;">
			<div class="card-content white-text">
				<div checkout=\''.$checkout.'\' id="'.$id.'" onclick="'.$onclick.'">
					<span style="color: #FFF;" class="card-title">'.$team.'</span>
					<p style="color: #FFF;">'.$type.'</p>
					<p style="color: #FFF;">'.$available.'</p>
				</div>
				<a style="background: #2A2A2A; position: absolute; bottom: 10px; right: 10px;" onclick="checkout('.$id.'); loadMyCheckouts(0, 30);" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">'.$icon.'
				</i></a>
			</div>
		</div>
	';


	$load_more =
	'
		<div class=\''.$lm_class.'\' onclick=\''.$load_function.'\' style=\'width: 100%; text-align: center;\'><p style=\'color: #fff; padding: 14px 0;\'>Load more</p></div>
	';

	if($last == "true") {
		echo $load_more;
	}else {
		echo $checkout;
	}

?>