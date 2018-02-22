<!-- depends on being requested from a file that includes the materalize library -->
<?php 

$team = $_GET['team'];
$type = $_GET['type'];
$available = $_GET['available'];
$card_color = $_GET['card_color'];
$onclick = $_GET['onclick'];

?>

<div onclick="<?php echo $onclick; ?>" class="card blue-grey darken-1" style="background: <?php echo $card_color; ?> !important;">
	<div class="card-content white-text">
		<span class="card-title"><?php echo $team; ?></span>
		<p><?php echo $type; ?></p>
		<p><?php echo $available; ?></p>
	</div>
</div>