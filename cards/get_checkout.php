<!-- depends on being requested from a file that includes the materalize library -->
<?php 

$team = $_GET['team'];
$type = $_GET['type'];
$available = $_GET['available'];
$card_color = $_GET['card_color'];
$onclick = $_GET['onclick'];
$checkout = $_GET['checkout'];
$id = $_GET['id'];
$match_order = $_GET['match_order']

?>

<div id="<?php echo $id; ?>" checkout='<?php echo $checkout; ?>' onclick="<?php echo $onclick; ?>" class="card blue-grey darken-1" style="background: <?php echo $card_color; ?> !important;">
	<div class="card-content white-text">
		<span class="card-title"><?php echo $team; ?></span>
		<p><?php
			if($type == "PIT") {
				echo $type;
			}else {
				echo $type." ".$match_order;
			}
		?></p>
		<p><?php echo $available; ?></p>
	</div>
</div>