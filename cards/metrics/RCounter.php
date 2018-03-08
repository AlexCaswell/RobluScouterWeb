<?php 

$checked_out = $_POST['checked_out'];
$metric = $_POST['metric'];
$modified = $_POST['modified'];
$title = $_POST['title'];
$id = $_POST['id'];
$value = $_POST['value'];
$cardColor = $_POST['cardColor'];

?>

<div class="card blue-grey darken-1" style="background: <?php echo $cardColor; ?> !important;">
	<div class="card-content white-text">
		<div>
			<span style="color: #FFF;" class="card-title"><?php echo $title; ?></span>
			<div style="pointer-events: <?php if($checked_out == "false") { echo "none"; } else { echo "auto"; } ?>; text-align: right; position: absolute; top: 20%; right: 30px;" metric='<?php echo $metric; ?>' id="<?php echo $id; ?>">
				<ul class="counter_ul" style="margin: 12px 0 4px 0;">
					<li onclick="update_counter(<?php echo "'".$id."'".", "."true" ?>)"  id="plus_<?php echo $id; ?>"><i class="material-icons">add</i></li>
					<li id="counter_<?php echo $id; ?>"><?php echo $value; ?></li>
					<li onclick="update_counter(<?php echo "'".$id."'".", "."false" ?>)" id="minus_<?php echo $id; ?>"><i class="material-icons">remove</i></li>
				</ul>
				<style>
					.counter_ul li {
						display: inline-block;
						padding: 0 10px;
						font-size: 1.6em;
					}
				</style>
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
