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

?>

<div class="card blue-grey darken-1" style="background: <?php echo $card_color; ?> !important;">
	<div class="card-content white-text">
		<div checkout='<?php echo $checkout; ?>' id="<?php echo $id; ?>" onclick="<?php echo $onclick; ?>">
			<span style="color: #FFF;" class="card-title"><?php echo $team; ?></span>
			<p style="color: #FFF;"><?php
				if($type == "PIT") {
					echo $type;
				}else {
					echo $type." ".$match_order;
				}
			?></p>
			<p style="color: #FFF;"><?php echo $available; ?></p>
		</div>
		<a style="background: #2A2A2A; position: absolute; bottom: 10px; right: 10px;" onclick="checkout(<?php echo $id; ?>); loadMyCheckouts();" class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">
			<?php

				if($checked_out == 1) {
					echo "cloud_upload";
				}else {
					echo "add";
				}

			?>
		</i></a>
	</div>
</div>
