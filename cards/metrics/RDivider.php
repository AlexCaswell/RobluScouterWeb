<?php 

$metric = $_POST['metric'];
$title = $_POST['title'];
$id = $_POST['id'];
$cardColor = $_POST['cardColor'];

?>

<div class="card blue-grey darken-1" style="background: <?php echo $cardColor; ?> !important;">
	<div class="card-content white-text" style="padding: 10px 0;">
		<div style="text-align: center;">
			<div style="margin: 0;" metric='<?php echo $metric; ?>' id="<?php echo $id; ?>">
				<span style="color: #FFF; margin: 0; font-size: 1.9em;" class="card-title"><?php echo $title; ?></span>
			</div>
		</div>
	</div>
</div>
