<?php 

$type = $_POST['type'];
$title = $_POST['title'];
$cardColor = $_POST['cardColor'];
$id = $_POST['id'];
$metric = $_POST['metric'];

?>

<div class="card blue-grey darken-1" style="background: <?php echo $cardColor; ?> !important;">
	<div class="card-content white-text">
		<div style="text-align: center;">
			<div metric='<?php echo $metric; ?>' id="<?php echo $id; ?>">
				<p style="font-size: 0.9em; padding: 12px 0;">The <?php echo $type; ?>, <?php echo $title; ?>, is an unsupported metric.</p>
			</div>
		</div>
	</div>
</div>