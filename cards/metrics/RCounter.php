<?php 

$checked_out = $_POST['checked_out'];
$metric = $_POST['metric'];
$modified = $_POST['modified'];
$title = $_POST['title'];
$text = $_POST['text'];
$id = $_POST['id'];
$oneLine = $_POST['oneLine'];
$numericalOnly = $_POST['numericalOnly'];
$cardColor = $_POST['cardColor'];

?>

<div class="card blue-grey darken-1" style="background: <?php echo $cardColor; ?> !important;">
	<div class="card-content white-text">
		<div>
			<span style="color: #FFF;" class="card-title"><?php echo $title; ?></span>
			<div style="pointer-events: <?php if($checked_out == "false") { echo "none"; } else { echo "auto"; } ?>; position: absolute; top: 20%; right: 30px;" metric='<?php echo $metric; ?>' id="<?php echo $id; ?>">
				<ul style="display: inline-block;">
					<li id="plus_<?php echo $id; ?>"><i class="material-icons">expand_less</i></li>
					<li id="counter_<?php echo $id; ?>">0</li>
					<li id="minus_<?php echo $id; ?>"><i class="material-icons">expand_more</i></li>
				</ul>
				<p  id="modified_<?php echo $id; ?>" style="font-size: 0.6em; color: #FFF; visibility: <?php if($modified == "true") { echo "hidden"; } else { echo "visible"; } ?>;">Not observed yet</p>
				<br>
			</div>
			<style type="text/css">
	  			input[type='radio']:checked + label:after {
	  				background: #888;
	  				border: #888;
	  			}
			</style>
		</div>
	</div>
</div>
